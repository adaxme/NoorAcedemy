'use client';

import { useState, useRef, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Volume2, Play } from 'lucide-react';

const arabicAlphabet = [
  { letter: 'أ', name: 'Alif', soundUrl: 'https://firebasestorage.googleapis.com/v0/b/noor-academy-a4195.appspot.com/o/alphabet%2FAlif.mp3?alt=media' },
  { letter: 'ب', name: 'Ba', soundUrl: 'https://firebasestorage.googleapis.com/v0/b/noor-academy-a4195.appspot.com/o/alphabet%2FBaa.mp3?alt=media' },
  { letter: 'ت', name: 'Ta', soundUrl: 'https://firebasestorage.googleapis.com/v0/b/noor-academy-a4195.appspot.com/o/alphabet%2FTaa.mp3?alt=media' },
  { letter: 'ث', name: 'Tha', soundUrl: 'https://firebasestorage.googleapis.com/v0/b/noor-academy-a4195.appspot.com/o/alphabet%2FThaa.mp3?alt=media' },
  { letter: 'ج', name: 'Jim', soundUrl: 'https://firebasestorage.googleapis.com/v0/b/noor-academy-a4195.appspot.com/o/alphabet%2FJeem.mp3?alt=media' },
  { letter: 'ح', name: 'Ha', soundUrl: 'https://firebasestorage.googleapis.com/v0/b/noor-academy-a4195.appspot.com/o/alphabet%2FHaa.mp3?alt=media' },
  { letter: 'خ', name: 'Kha', soundUrl: 'https://firebasestorage.googleapis.com/v0/b/noor-academy-a4195.appspot.com/o/alphabet%2FKhaa.mp3?alt=media' },
  { letter: 'د', name: 'Dal', soundUrl: 'https://firebasestorage.googleapis.com/v0/b/noor-academy-a4195.appspot.com/o/alphabet%2FDal.mp3?alt=media' },
  { letter: 'ذ', name: 'Dhal', soundUrl: 'https://firebasestorage.googleapis.com/v0/b/noor-academy-a4195.appspot.com/o/alphabet%2FDhaal.mp3?alt=media' },
  { letter: 'ر', name: 'Ra', soundUrl: 'https://firebasestorage.googleapis.com/v0/b/noor-academy-a4195.appspot.com/o/alphabet%2FRaa.mp3?alt=media' },
  { letter: 'ز', name: 'Za', soundUrl: 'https://firebasestorage.googleapis.com/v0/b/noor-academy-a4195.appspot.com/o/alphabet%2FZay.mp3?alt=media' },
  { letter: 'س', name: 'Sin', soundUrl: 'https://firebasestorage.googleapis.com/v0/b/noor-academy-a4195.appspot.com/o/alphabet%2FSeen.mp3?alt=media' },
  { letter: 'ش', name: 'Shin', soundUrl: 'https://firebasestorage.googleapis.com/v0/b/noor-academy-a4195.appspot.com/o/alphabet%2FSheen.mp3?alt=media' },
  { letter: 'ص', name: 'Sad', soundUrl: 'https://firebasestorage.googleapis.com/v0/b/noor-academy-a4195.appspot.com/o/alphabet%2FSawd.mp3?alt=media' },
  { letter: 'ض', name: 'Dad', soundUrl: 'https://firebasestorage.googleapis.com/v0/b/noor-academy-a4195.appspot.com/o/alphabet%2FDawd.mp3?alt=media' },
  { letter: 'ط', name: 'Tah', soundUrl: 'https://firebasestorage.googleapis.com/v0/b/noor-academy-a4195.appspot.com/o/alphabet%2FTah.mp3?alt=media' },
  { letter: 'ظ', name: 'Dha', soundUrl: 'https://firebasestorage.googleapis.com/v0/b/noor-academy-a4195.appspot.com/o/alphabet%2FDhah.mp3?alt=media' },
  { letter: 'ع', name: 'Ayn', soundUrl: 'https://firebasestorage.googleapis.com/v0/b/noor-academy-a4195.appspot.com/o/alphabet%2FAyn.mp3?alt=media' },
  { letter: 'غ', name: 'Ghayn', soundUrl: 'https://firebasestorage.googleapis.com/v0/b/noor-academy-a4195.appspot.com/o/alphabet%2FGhayn.mp3?alt=media' },
  { letter: 'ف', name: 'Fa', soundUrl: 'https://firebasestorage.googleapis.com/v0/b/noor-academy-a4195.appspot.com/o/alphabet%2FFaa.mp3?alt=media' },
  { letter: 'ق', name: 'Qaf', soundUrl: 'https://firebasestorage.googleapis.com/v0/b/noor-academy-a4195.appspot.com/o/alphabet%2FQawf.mp3?alt=media' },
  { letter: 'ك', name: 'Kaf', soundUrl: 'https://firebasestorage.googleapis.com/v0/b/noor-academy-a4195.appspot.com/o/alphabet%2FKaf.mp3?alt=media' },
  { letter: 'ل', name: 'Lam', soundUrl: 'https://firebasestorage.googleapis.com/v0/b/noor-academy-a4195.appspot.com/o/alphabet%2FLam.mp3?alt=media' },
  { letter: 'م', name: 'Mim', soundUrl: 'https://firebasestorage.googleapis.com/v0/b/noor-academy-a4195.appspot.com/o/alphabet%2FMeem.mp3?alt=media' },
  { letter: 'ن', name: 'Nun', soundUrl: 'https://firebasestorage.googleapis.com/v0/b/noor-academy-a4195.appspot.com/o/alphabet%2FNoon.mp3?alt=media' },
  { letter: 'ه', name: 'Ha', soundUrl: 'https://firebasestorage.googleapis.com/v0/b/noor-academy-a4195.appspot.com/o/alphabet%2FHa-2.mp3?alt=media' },
  { letter: 'و', name: 'Waw', soundUrl: 'https://firebasestorage.googleapis.com/v0/b/noor-academy-a4195.appspot.com/o/alphabet%2FWaw.mp3?alt=media' },
  { letter: 'ي', name: 'Ya', soundUrl: 'https://firebasestorage.googleapis.com/v0/b/noor-academy-a4195.appspot.com/o/alphabet%2FYaa.mp3?alt=media' },
];

export default function AlphabetPage() {
  const [selectedLetter, setSelectedLetter] = useState(arabicAlphabet[0]);
  const audioRef = useRef<HTMLAudioElement>(null);

  const handleLetterClick = (letter: typeof arabicAlphabet[0]) => {
    setSelectedLetter(letter);
  };

  const playSound = () => {
    if (audioRef.current) {
      audioRef.current.play().catch(error => console.error("Audio play failed:", error));
    }
  };

  useEffect(() => {
    if (selectedLetter && audioRef.current) {
        audioRef.current.src = selectedLetter.soundUrl;
        playSound();
    }
  }, [selectedLetter]);

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-3xl font-bold">Arabic Alphabet</h1>
        <p className="text-muted-foreground">Learn the letters of the Qur'an. Click a letter to hear it!</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2">
            <Card>
                <CardContent className="p-4">
                <div dir="rtl" className="grid grid-cols-4 sm:grid-cols-5 md:grid-cols-6 lg:grid-cols-7 gap-2 text-center">
                    {arabicAlphabet.map((char) => (
                    <Button
                        key={char.name}
                        variant={selectedLetter.name === char.name ? 'default' : 'outline'}
                        className="text-4xl h-20 w-full font-arabic"
                        onClick={() => handleLetterClick(char)}
                    >
                        {char.letter}
                    </Button>
                    ))}
                </div>
                </CardContent>
            </Card>
        </div>

        <div className="md:col-span-1">
          <Card className="sticky top-20">
            <CardContent className="p-6 flex flex-col items-center justify-center gap-4">
                <div className="text-9xl text-primary font-arabic">{selectedLetter.letter}</div>
                <div className="text-3xl font-bold">{selectedLetter.name}</div>
                <Button onClick={playSound} size="lg" className="w-full">
                    <Play className="mr-2"/>
                    Play Sound
                </Button>
                <audio ref={audioRef} src={selectedLetter.soundUrl} className="w-full mt-2" controls />
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
