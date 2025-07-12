
'use client';

import { useState, useRef, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { surahs, Surah } from '@/lib/quran-data';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Play, Pause, BookOpen } from 'lucide-react';

export default function QuranPage() {
  const [selectedSurah, setSelectedSurah] = useState<Surah>(surahs[0]);
  const [currentAyah, setCurrentAyah] = useState<number | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);

  const handleSurahChange = (surahId: string) => {
    const surah = surahs.find(s => s.id === parseInt(surahId));
    if (surah) {
      setSelectedSurah(surah);
      setCurrentAyah(null);
      setIsPlaying(false);
      if (audioRef.current) {
        audioRef.current.pause();
      }
    }
  };

  const playAudio = (audioUrl: string, ayahIndex: number) => {
    if (audioRef.current) {
      if (currentAyah === ayahIndex && isPlaying) {
        audioRef.current.pause();
        setIsPlaying(false);
      } else {
        audioRef.current.src = audioUrl;
        audioRef.current.play().catch(console.error);
        setCurrentAyah(ayahIndex);
        setIsPlaying(true);
      }
    }
  };

  useEffect(() => {
    const audio = audioRef.current;
    if (audio) {
      const onEnded = () => setIsPlaying(false);
      const onPause = () => setIsPlaying(false);
      const onPlay = () => setIsPlaying(true);

      audio.addEventListener('ended', onEnded);
      audio.addEventListener('pause', onPause);
      audio.addEventListener('play', onPlay);

      return () => {
        audio.removeEventListener('ended', onEnded);
        audio.removeEventListener('pause', onPause);
        audio.removeEventListener('play', onPlay);
      };
    }
  }, []);

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-3xl font-bold">Qur'an Memorization</h1>
        <p className="text-muted-foreground">Listen and repeat to memorize short Surahs.</p>
      </div>
      <Card>
        <CardHeader>
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <CardTitle className="text-2xl">{selectedSurah.name} - {selectedSurah.transliteration}</CardTitle>
            <Select onValueChange={handleSurahChange} defaultValue={String(selectedSurah.id)}>
                <SelectTrigger className="w-full sm:w-[200px]">
                    <SelectValue placeholder="Select a Surah" />
                </SelectTrigger>
                <SelectContent>
                    {surahs.map(s => (
                        <SelectItem key={s.id} value={String(s.id)}>
                            {s.id}. {s.transliteration}
                        </SelectItem>
                    ))}
                </SelectContent>
            </Select>
          </div>
        </CardHeader>
        <CardContent className="flex flex-col gap-4">
          <Card>
            <CardContent className="p-4 bg-primary/10 rounded-lg">
                <p className="text-center text-lg font-semibold text-primary">
                    بِسْمِ ٱللَّهِ ٱلرَّحْمَٰنِ ٱلرَّحِيمِ
                </p>
                <p className="text-center text-sm text-muted-foreground">
                    Bismillāhir-raḥmānir-raḥīm
                </p>
            </CardContent>
          </Card>

          <div className="space-y-4">
            {selectedSurah.verses.map((ayah, index) => (
              <Card key={ayah.id} className={`transition-all ${currentAyah === index ? 'border-primary ring-2 ring-primary' : ''}`}>
                <CardContent className="p-4 flex flex-col md:flex-row items-center justify-between gap-4">
                  <div className="flex items-center gap-4">
                    <div className="flex items-center justify-center size-8 rounded-full bg-primary text-primary-foreground font-bold">
                      {ayah.id}
                    </div>
                    <p dir="rtl" className="text-2xl md:text-3xl font-arabic leading-loose text-right flex-1">
                      {ayah.text}
                    </p>
                  </div>
                  <Button variant="outline" size="icon" onClick={() => playAudio(ayah.audio, index)}>
                    {isPlaying && currentAyah === index ? <Pause className="size-5" /> : <Play className="size-5" />}
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>
      <audio ref={audioRef} className="hidden" />
    </div>
  );
}
