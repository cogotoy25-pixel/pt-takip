'use client';

import React, { useState, useEffect } from 'react';
import { createClient } from '@supabase/supabase-js';

// Supabase Bağlantısı
const supabaseUrl = 'https://eeqevfkdnrfcnexwrai.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImVlcWV2ZmtkbnJmY25leHdyYWkiLCJyb2xlIjoiYW5vbiIsInJpYXQiOjI2NDFfaDYycyDqYDIq4'; 
const supabase = createClient(supabaseUrl, supabaseKey);

interface ExerciseItem {
  id: string;
  name: string;
  superset?: string;
  setInfo: string;
  tempo: string;
  rest: string;
  note: string;
  youtubeQuery: string;
}

interface WorkoutDay {
  dayName: string;
  subtitle: string;
  exercises: ExerciseItem[];
}

const workoutData: Record<string, WorkoutDay> = {
  gunA: {
    dayName: 'GÜN A: TÜM VÜCUT (DİZ DOMİNANT • İTİŞ/ÇEKİŞ)',
    subtitle: 'Hyrox Entegrasyonlu Performans Takibi',
    exercises: [
      { id: 'a1', name: 'Goblet Squat', superset: 'A2 Floor Press', setInfo: '4 × 8-10', tempo: '3 sn in, 1 sn dur, 1 sn kalk', rest: '75 sn', note: 'Dumbbell göğüse yapışık, dizler dizlerin içine insin. A2 ile dönüşümlü.', youtubeQuery: 'Goblet Squat form' },
      { id: 'a2', name: 'Dumbbell Floor Press', superset: 'A1 Goblet Squat', setInfo: '4 × 10-12', tempo: '2 sn in, dirsek yerde 1 sn dur, kalk', rest: '75 sn', note: 'Dirsekler yerde kısa duruş, patlayıcı kalkış.', youtubeQuery: 'Dumbbell Floor Press form' },
      { id: 'b1', name: 'Bulgarian Split Squat', superset: 'B2 Dumbbell Row', setInfo: '3 × 10-12 (her bacak)', tempo: '3 sn in, tepeye kalk', rest: '60 sn', note: 'Gövde hafif önde, ön bacak ağırlıklı.', youtubeQuery: 'Bulgarian Split Squat form' },
      { id: 'b2', name: 'Dumbbell Row', superset: 'B1 Bulgarian Split Squat', setInfo: '3 × 10-12', tempo: '1 sn çek, 2 sn bırak', rest: '60 sn', note: 'Sırtı düz tut, kürek kemiklerini sıkıştır.', youtubeQuery: 'Dumbbell Row form' },
      { id: 'c1', name: 'Kettlebell Romanian Deadlift (RDL)', superset: 'C2 Lateral Raise', setInfo: '3 × 12-15', tempo: '3 sn yavaşça in, kalça sık', rest: '60 sn', note: 'Dizler hafif kırık, kalçayı geriye it.', youtubeQuery: 'Kettlebell Romanian Deadlift form' },
      { id: 'c2', name: 'Dumbbell Lateral Raise', superset: 'C1 Kettlebell RDL', setInfo: '3 × 15', tempo: '1 sn kaldır, 2 sn yavaş indir', rest: '45 sn', note: 'Omuz başlarıyla kaldır, serçe parmak hafif yukarı.', youtubeQuery: 'Dumbbell Lateral Raise form' },
      { id: 'd', name: 'Copenhagen Plank', setInfo: '3 × 15-20 sn (her bacak)', tempo: 'İzometrik tutuş', rest: '45 sn', note: 'Direkt kaldırma, gövdeyi düz tut, iç bacak aktif.', youtubeQuery: 'Copenhagen Plank form' },
    ],
  },
  gunB: {
    dayName: 'GÜN B: TÜM VÜCUT (KALÇA/POSTERİOR • ÜST VÜCUT)',
    subtitle: 'Hyrox Entegrasyonlu Performans Takibi',
    exercises: [
      { id: 'b_a1', name: 'Dumbbell Sumo Deadlift', superset: 'A2 Overhead Press', setInfo: '4 × 10-12', tempo: '3 sn in, kalçayla kalk', rest: '75 sn', note: 'Ayaklar geniş, göğüs dik, kalçayı aktif kullan.', youtubeQuery: 'Dumbbell Sumo Deadlift form' },
      { id: 'b_a2', name: 'Dumbbell Overhead Press (OHP)', superset: 'A1 Sumo Deadlift', setInfo: '4 × 8-10', tempo: '2 sn kaldır, 2 sn indir', rest: '75 sn', note: 'Karın sıkı, bel çukurunu koru.', youtubeQuery: 'Dumbbell Overhead Press form' },
      { id: 'b_b1', name: 'Dumbbell Step-Up', superset: 'B2 Lat Pulldown / Çekiş', setInfo: '3 × 10 (her bacak)', tempo: 'Kontrollü çıkış ve iniş', rest: '60 sn', note: 'Ön bacaktan güç al, arkadan destek alma.', youtubeQuery: 'Dumbbell Step Up form' },
      { id: 'b_b2', name: 'Dumbbell Renegade Row', superset: 'B1 Step-Up', setInfo: '3 × 8-10 (her kol)', tempo: 'Dengeli çekiş', rest: '60 sn', note: 'Kalçayı döndürme, gövdeyi yere paralel tut.', youtubeQuery: 'Dumbbell Renegade Row form' },
      { id: 'b_c1', name: 'Dumbbell Glute Bridge', superset: 'C2 Biceps/Triceps', setInfo: '3 × 15', tempo: '1 sn kalk, tepede 2 sn sık', rest: '45 sn', note: 'Topuklardan güç al, kalçayı tepeye kilitle.', youtubeQuery: 'Dumbbell Glute Bridge form' },
      { id: 'b_c2', name: 'Dumbbell Biceps Curl to Overhead Press', superset: 'C1 Glute Bridge', setInfo: '3 × 12', tempo: 'Akıcı geçiş', rest: '45 sn', note: 'Bilekleri döndürerek yukarı it.', youtubeQuery: 'Dumbbell Biceps Curl to Overhead Press form' },
      { id: 'b_d', name: 'Dead Bug', setInfo: '3 × 10 tekrar (her bacak)', tempo: 'Yavaş ve kontrollü', rest: '45 sn', note: 'Belini tamamen yere yapıştır, boşluk bırakma.', youtubeQuery: 'Dead Bug form' },
    ],
  },
};

export default function PTApp() {
  const [activeTab, setActiveTab] = useState<'program' | 'coach'>('program');
  const [selectedDay, setSelectedDay] = useState<'gunA' | 'gunB'>('gunA');
  const [studentName, setStudentName] = useState('Halime Yasak');
  const [coachNote, setCoachNote] = useState('');
  const [inputs, setInputs] = useState<Record<string, Record<number, { kg: string; tekrar: string; zorluk: string }>>>({});
  
  const [transitionCounts, setTransitionCounts] = useState<Record<string, number>>({});
  const [finishedSets, setFinishedSets] = useState<Record<string, number[]>>({});

  const [isCoach, setIsCoach] = useState(false);
  const [savedWorkouts, setSavedWorkouts] = useState<any[]>([]);
  const [restTime, setRestTime] = useState<number | null>(null);

  const currentWorkout = workoutData[selectedDay];

  const getSetCount = (setInfo: string) => {
    const match = setInfo.match(/^(\d+)/);
    return match ? parseInt(match[1]) : 4;
  };

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    if (urlParams.get('yetki') === 'koc') {
      localStorage.setItem('isCoach', 'true');
      setIsCoach(true);
    } else if (localStorage.getItem('isCoach') === 'true') {
      setIsCoach(true);
    }
  }, []);

  const handleSecretTap = () => {
    if (!isCoach) {
      localStorage.setItem('isCoach', 'true');
      setIsCoach(true);
      alert('🔓 Antrenör Paneli Aktif Edildi!');
    } else {
       localStorage.removeItem('isCoach');
       setIsCoach(false);
       setActiveTab('program');
       alert('🔒 Antrenör Paneli Kapatıldı.');
    }
  };

  useEffect(() => {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      window.speechSynthesis.getVoices();
    }
  }, []);

  const playWarningSound = () => {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance("Yeni set için hazırlan.");
      utterance.lang = 'tr-TR';
      utterance.rate = 1.0;
      utterance.volume = 0.8;
      
      const voices = window.speechSynthesis.getVoices();
      const turkishVoices = voices.filter(v => v.lang.includes('tr'));
      const femaleVoice = turkishVoices.find(v => v.name.toLowerCase().includes('female') || v.name.includes('Yelda')) || turkishVoices[0];
      
      if (femaleVoice) {
        utterance.voice = femaleVoice;
      }
      window.speechSynthesis.speak(utterance);
    }
  };

  useEffect(() => {
    if (restTime === null || restTime <= 0) return;
    const timer = setInterval(() => {
      setRestTime((prev) => {
        if (prev === 11) playWarningSound();
        return prev ? prev - 1 : 0;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, [restTime]);

  const formatTime = (seconds: number) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m}:${s < 10 ? '0' : ''}${s}`;
  };

  const handleInputChange = (exerciseId: string, setNo: number, field: 'kg' | 'tekrar' | 'zorluk', value: string) => {
    setInputs(prev => ({
      ...prev,
      [exerciseId]: {
        ...(prev[exerciseId] || {}),
        [setNo]: {
          kg: prev[exerciseId]?.[setNo]?.kg || '',
          tekrar: prev[exerciseId]?.[setNo]?.tekrar || '',
          zorluk: prev[exerciseId]?.[setNo]?.zorluk || '',
          [field]: value
        }
      }
    }));
  };

  const handleBitir = (exerciseId: string, setNo: number, restString: string) => {
    const isAlreadyFinished = finishedSets[exerciseId]?.includes(setNo);

    if (isAlreadyFinished) {
      setFinishedSets(prev => ({
        ...prev,
        [exerciseId]: prev[exerciseId].filter(n => n !== setNo)
      }));
      setRestTime(null);
    } else {
      setFinishedSets(prev => ({
        ...prev,
        [exerciseId]: [...(prev[exerciseId] || []), setNo]
      }));

      const seconds = parseInt(restString.replace(/\D/g, ''));
      if (!isNaN(seconds)) {
        setRestTime(seconds);
      }
    }
  };

  const handleGec = (supersetText: string, currentId: string) => {
    setRestTime(null);

    const targetCode = supersetText.split(' ')[0].toLowerCase();
    const isDayB = currentId.startsWith('b_');
    const targetId = isDayB ? `b_${targetCode}` : targetCode;
    
    const currentEx = currentWorkout.exercises.find(e => e.id === currentId);
    const targetEx = currentWorkout.exercises.find(e => e.id === targetId);
    
    const currentTotalSets = currentEx ? getSetCount(currentEx.setInfo) : 4;
    const targetTotalSets = targetEx ? getSetCount(targetEx.setInfo) : 4;

    const pairKey = [currentId, targetId].sort().join('-');
    const currentClicks = (transitionCounts[pairKey] || 0) + 1;
    setTransitionCounts(prev => ({ ...prev, [pairKey]: currentClicks }));

    const maxTransitions = currentTotalSets + targetTotalSets - 1; 
    let elementToScrollId = targetId;

    if (currentClicks > maxTransitions) {
      const currentIndex = currentWorkout.exercises.findIndex(e => e.id === currentId);
      let nextIndex = currentIndex + 1;
      
      if (currentWorkout.exercises[nextIndex]?.id === targetId) {
        nextIndex++; 
      }
      
      if (currentWorkout.exercises[nextIndex]) {
        elementToScrollId = currentWorkout.exercises[nextIndex].id;
      } else {
        alert('🎉 Antrenmanın sonuna geldin!');
        return;
      }
    }

    const targetElement = document.getElementById(elementToScrollId);
    if (targetElement) {
      targetElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
      targetElement.classList.add('ring-4', 'ring-blue-400', 'transition-all', 'duration-500');
      setTimeout(() => {
        targetElement.classList.remove('ring-4', 'ring-blue-400');
      }, 1500);
    }
  };

  // İNGİLİZCE SÜTUN İSİMLERİNE GÖRE GÜNCELLENMİŞ KAYIT FONKSİYONU
  const saveWorkoutToSupabase = async () => {
    try {
      const workoutPayload = currentWorkout.exercises.map(ex => {
        return {
          exercise: ex.name,
          sets: [1, 2, 3, 4].map(setNo => ({
            set_no: setNo,
            kg: inputs[ex.id]?.[setNo]?.kg || 'BOŞ',
            tekrar: inputs[ex.id]?.[setNo]?.tekrar || 'BOŞ',
            zorluk: inputs[ex.id]?.[setNo]?.zorluk || 'BOŞ'
          }))
        };
      });

      await supabase.from('completed_workouts').insert([
        {
          student_name: studentName,
          workout_day: currentWorkout.dayName.split(':')[0],
          workout_data: workoutPayload,
          coach_note: coachNote || 'Not yok'
        }
      ]);
      alert('Antrenman Başarıyla Kaydedildi!');
    } catch (err) {
      console.error("Supabase kayıt hatası:", err);
      alert('Kayıt sırasında hata oluştu.');
    }
  };

  // İNGİLİZCE SÜTUN İSİMLERİNE GÖRE GÜNCELLENMİŞ VERİ ÇEKME FONKSİYONU
  useEffect(() => {
    if (activeTab === 'coach' && isCoach) {
      supabase
        .from('completed_workouts')
        .select('*')
        .order('created_at', { ascending: false })
        .then(({ data }) => {
          if (data) setSavedWorkouts(data);
        });
    }
  }, [activeTab, isCoach]);

  return (
    <main className="min-h-screen bg-slate-100 text-slate-800 font-sans pb-24">
      {restTime !== null && restTime > 0 && (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 bg-[#2a3b68] border border-blue-400 shadow-2xl rounded-full px-6 py-3 z-50 flex items-center gap-4 text-white">
          <span className="animate-pulse text-xl">⏱️</span>
          <div className="flex flex-col">
            <span className="text-[10px] text-blue-200 font-bold leading-none">DİNLENME</span>
            <span className="font-extrabold text-xl leading-none">{formatTime(restTime)}</span>
          </div>
          <button 
            onClick={() => setRestTime(null)} 
            className="ml-4 bg-[#1e2a4a] text-blue-200 hover:text-white text-xs px-4 py-2 rounded-full border border-blue-700 font-bold"
          >
            Kapat
          </button>
        </div>
      )}

      <div className="bg-[#2a3b68] text-white p-6 rounded-b-[2rem] mb-6 shadow-md text-center relative max-w-2xl mx-auto">
        <h1 
          className="text-xl font-bold mb-1 tracking-wide cursor-pointer" 
          onDoubleClick={handleSecretTap}
        >
          KUVVET & HİPERTROFİ
        </h1>
        <p className="text-[11px] text-blue-200 mb-6 font-medium">Hyrox Entegrasyonlu Performans Takibi</p>

        {isCoach && (
          <div className="flex justify-center bg-[#1e2a4a] p-1.5 rounded-xl w-fit mx-auto mb-4 border border-[#3b4b7a]">
            <button onClick={() => setActiveTab('program')} className={`px-4 py-2 text-xs font-bold rounded-lg ${activeTab === 'program' ? 'bg-slate-50 text-[#2a3b68] shadow' : 'text-blue-300'}`}>Program</button>
            <button onClick={() => setActiveTab('coach')} className={`px-4 py-2 text-xs font-bold rounded-lg ${activeTab === 'coach' ? 'bg-slate-50 text-[#2a3b68] shadow' : 'text-blue-300'}`}>📊 Panel</button>
          </div>
        )}

        {activeTab === 'program' && (
          <div className="flex justify-center gap-3">
            <button onClick={() => setSelectedDay('gunA')} className={`px-6 py-2.5 rounded-full text-xs font-bold transition-all shadow-sm ${selectedDay === 'gunA' ? 'bg-slate-50 text-[#2a3b68]' : 'bg-[#3b4b7a] text-blue-100 border border-[#4a5a8a]'}`}>Gün A (Salı)</button>
            <button onClick={() => setSelectedDay('gunB')} className={`px-6 py-2.5 rounded-full text-xs font-bold transition-all shadow-sm ${selectedDay === 'gunB' ? 'bg-slate-50 text-[#2a3b68]' : 'bg-[#3b4b7a] text-blue-100 border border-[#4a5a8a]'}`}>Gün B (Cuma)</button>
          </div>
        )}
      </div>

      <div className="max-w-2xl mx-auto px-4">
        {activeTab === 'program' ? (
          <>
            <div className="mb-6 flex flex-col sm:flex-row items-center justify-between gap-3 bg-slate-50 p-4 rounded-xl border border-slate-200 shadow-sm">
              <input type="text" value={studentName} onChange={(e) => setStudentName(e.target.value)} className="bg-white border border-slate-200 rounded-lg px-3 py-2 text-sm w-full sm:w-auto outline-none focus:border-blue-500 font-bold text-slate-700 shadow-sm" placeholder="Sporcu Adı" />
            </div>

            <div className="mb-6 bg-slate-50 border border-slate-200 p-4 rounded-xl shadow-sm text-center">
              <h2 className="text-sm font-bold text-[#2a3b68]">{currentWorkout.dayName}</h2>
            </div>

            <div className="space-y-6">
              {currentWorkout.exercises.map((ex) => (
                <div key={ex.id} id={ex.id} className="bg-slate-50 border border-slate-200 rounded-3xl p-5 shadow-sm">
                  <div className="flex justify-between items-start mb-4">
                    <h3 className="font-extrabold text-slate-800 text-[15px]">{ex.id.split('_').pop()?.toUpperCase()}: {ex.name}</h3>
                    
                    <a 
                      href={`https://www.youtube.com/results?search_query=${encodeURIComponent(ex.youtubeQuery)}`} 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className="group flex items-center gap-1.5 text-[11px] text-blue-700 bg-blue-50 border border-blue-200 hover:bg-[#2a3b68] hover:text-white hover:border-[#2a3b68] px-3 py-1.5 rounded-full font-bold transition-all duration-300 shadow-sm"
                    >
                      <span className="relative flex h-2.5 w-2.5">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-red-500 group-hover:bg-white transition-colors"></span>
                      </span>
                      İdeal Formu İzle
                    </a>
                  </div>

                  {ex.superset && (
                    <div className="flex items-center justify-between bg-[#f4f7ff] border border-[#dce5fc] rounded-2xl p-3 mb-5">
                      <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-xl bg-[#e0e7ff] flex items-center justify-center text-blue-600 text-lg">
                          🔄
                        </div>
                        <div>
                          <span className="text-[9px] text-blue-500 font-extrabold tracking-wider block mb-0.5">DÖNÜŞÜMLÜ SET</span>
                          <span className="text-xs font-bold text-slate-700">Sıradaki: {ex.superset}</span>
                        </div>
                      </div>
                      <button onClick={() => ex.superset && handleGec(ex.superset, ex.id)} className="bg-blue-600 text-white text-xs font-bold px-5 py-2 rounded-xl shadow-sm hover:bg-blue-700 transition-colors">
                        Geç ⌛
                      </button>
                    </div>
                  )}

                  <div className="grid grid-cols-3 gap-2 mb-5 text-center">
                    <div className="bg-white rounded-xl p-2.5 border border-slate-100 shadow-sm">
                      <span className="text-[9px] text-slate-400 block font-bold mb-1">SET × TEKRAR</span>
                      <span className="text-xs font-extrabold text-[#2a3b68]">{ex.setInfo}</span>
                    </div>
                    <div className="bg-white rounded-xl p-2.5 border border-slate-100 shadow-sm">
                      <span className="text-[9px] text-slate-400 block font-bold mb-1">TEMPO</span>
                      <span className="text-xs font-extrabold text-[#2a3b68]">{ex.tempo}</span>
                    </div>
                    <div className="bg-white rounded-xl p-2.5 border border-slate-100 shadow-sm">
                      <span className="text-[9px] text-slate-400 block font-bold mb-1">DİNLENME</span>
                      <span className="text-xs font-extrabold text-[#2a3b68]">{ex.rest}</span>
                    </div>
                  </div>

                  <div className="text-xs text-slate-600 mb-5 pb-5 border-b border-slate-200">
                    <strong className="text-slate-800">Not:</strong> {ex.note}
                  </div>

                  <div className="overflow-x-auto">
                    <table className="w-full text-center text-xs">
                      <thead>
                        <tr className="text-slate-500 border-b border-slate-200">
                          <th className="pb-3 font-bold w-10 text-[10px]">SET</th>
                          <th className="pb-3 font-bold text-[10px]">KG</th>
                          <th className="pb-3 font-bold text-[10px]">TEK</th>
                          <th className="pb-3 font-bold text-[10px]">ZORLUK (1-10)</th>
                          <th className="pb-3 font-bold text-[10px]">DURUM</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-100">
                        {[1, 2, 3, 4].map((setNo) => {
                          const isSetDone = finishedSets[ex.id]?.includes(setNo);

                          return (
                            <tr key={setNo}>
                              <td className="py-3 font-extrabold text-slate-700">#{setNo}</td>
                              <td className="py-3 px-1">
                                <input 
                                  type="text" 
                                  placeholder="0" 
                                  value={inputs[ex.id]?.[setNo]?.kg || ''} 
                                  onChange={(e) => handleInputChange(ex.id, setNo, 'kg', e.target.value)} 
                                  disabled={isSetDone}
                                  className={`w-full border rounded-lg py-2 text-center font-bold outline-none shadow-sm transition-colors ${isSetDone ? 'bg-slate-100 border-transparent text-slate-400 cursor-not-allowed' : 'bg-white border-slate-200 text-slate-800 focus:border-blue-500'}`} 
                                />
                              </td>
                              <td className="py-3 px-1">
                                <input 
                                  type="text" 
                                  placeholder="0" 
                                  value={inputs[ex.id]?.[setNo]?.tekrar || ''} 
                                  onChange={(e) => handleInputChange(ex.id, setNo, 'tekrar', e.target.value)} 
                                  disabled={isSetDone}
                                  className={`w-full border rounded-lg py-2 text-center font-bold outline-none shadow-sm transition-colors ${isSetDone ? 'bg-slate-100 border-transparent text-slate-400 cursor-not-allowed' : 'bg-white border-slate-200 text-slate-800 focus:border-blue-500'}`} 
                                />
                              </td>
                              <td className="py-3 px-1">
                                <input 
                                  type="text" 
                                  placeholder="-" 
                                  value={inputs[ex.id]?.[setNo]?.zorluk || ''} 
                                  onChange={(e) => handleInputChange(ex.id, setNo, 'zorluk', e.target.value)} 
                                  disabled={isSetDone}
                                  className={`w-full border rounded-lg py-2 text-center font-bold outline-none shadow-sm transition-colors ${isSetDone ? 'bg-slate-100 border-transparent text-slate-400 cursor-not-allowed' : 'bg-white border-slate-200 text-slate-800 focus:border-blue-500'}`} 
                                />
                              </td>
                              <td className="py-3 pl-2">
                                <button 
                                  onClick={() => handleBitir(ex.id, setNo, ex.rest)} 
                                  className={`w-full text-white font-bold py-2 rounded-xl text-xs transition-colors shadow-sm ${isSetDone ? 'bg-green-600 hover:bg-green-700' : 'bg-[#3b4b7a] hover:bg-[#2a3b68]'}`}
                                >
                                  {isSetDone ? 'Bitti ✓' : 'Bitir'}
                                </button>
                              </td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-8 bg-slate-50 border border-slate-200 rounded-3xl p-6 shadow-sm">
              <label className="block text-xs font-bold text-[#2a3b68] mb-2">Antrenörüne Not Bırak:</label>
              <textarea rows={3} placeholder="Zorlandığın bir hareket oldu mu?" value={coachNote} onChange={(e) => setCoachNote(e.target.value)} className="w-full bg-white border border-slate-200 rounded-xl p-4 text-sm outline-none focus:border-blue-500 mb-4 text-slate-700 font-medium shadow-sm" />
              <button onClick={saveWorkoutToSupabase} className="w-full bg-[#2a3b68] hover:bg-[#1e2a4a] text-white font-bold py-4 rounded-xl shadow-md transition-all text-sm">
                Antrenmanı Kaydet ve Bitir
              </button>
            </div>
          </>
        ) : (
          <div className="space-y-4">
            <h2 className="text-lg font-extrabold text-[#2a3b68] mb-4">Sporcu Antrenman Geçmişi</h2>
            {/* İNGİLİZCE SÜTUN İSİMLERİNE GÖRE GÜNCELLENMİŞ EKRAN YANSITMASI */}
            {savedWorkouts.map((workout, index) => (
              <div key={index} className="bg-slate-50 border border-slate-200 rounded-3xl p-5 shadow-sm">
                <div className="flex justify-between items-center border-b border-slate-200 pb-3 mb-3">
                  <span className="font-extrabold text-slate-800">{workout.student_name} <span className="text-blue-500 ml-1">• {workout.workout_day}</span></span>
                  <span className="text-[10px] text-slate-400 font-bold">{new Date(workout.created_at).toLocaleString('tr-TR')}</span>
                </div>
                <div className="text-xs text-slate-600 mb-4 bg-white p-3 rounded-xl border border-slate-100 shadow-sm italic">&quot; {workout.coach_note} &quot;</div>
                {workout.workout_data?.map((ex: any, i: number) => (
                  <div key={i} className="mb-3 text-xs bg-white p-3 rounded-xl border border-slate-100 shadow-sm">
                    <strong className="text-[#2a3b68] block mb-2">{ex.exercise}</strong>
                    <div className="grid grid-cols-4 gap-2">
                      {ex.sets?.map((set: any, sIdx: number) => (
                        <div key={sIdx} className="bg-slate-50 p-2 rounded-lg border border-slate-200 text-center">
                          <div className="text-[9px] text-slate-400 font-bold mb-1">SET {set.set_no}</div>
                          <div className="font-bold text-slate-700">{set.kg} <span className="text-[9px] font-normal">kg</span></div>
                          <div className="font-bold text-slate-700">{set.tekrar} <span className="text-[9px] font-normal">tek</span></div>
                          <div className="font-bold text-blue-600 mt-1">Z: {set.zorluk}</div>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
