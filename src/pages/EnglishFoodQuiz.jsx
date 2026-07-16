import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { ArrowLeft, ArrowRight, CheckCircle2, Heart, XCircle } from "lucide-react";
import { useNavigate } from "react-router-dom";
import "../styles/english-food-unit.css";

const bank = [
  { question: "What is ‘manzana’ in English?", answer: "Apple", options: ["Apple","Bread","Milk","Rice"] },
  { question: "Choose the correct word for 🍌", answer: "Banana", options: ["Chicken","Banana","Cake","Cheese"] },
  { question: "What do we drink?", answer: "Milk", options: ["Bread","Rice","Milk","Chicken"] },
  { question: "Complete: The ___ is yellow. 🧀", answer: "cheese", options: ["juice","cheese","apple","cake"] },
  { question: "Which one is a dessert?", answer: "Ice cream", options: ["Rice","Chicken","Bread","Ice cream"] },
  { question: "What is ‘pan’ in English?", answer: "Bread", options: ["Bread","Banana","Juice","Apple"] },
  { question: "Choose the correct word for 🍗", answer: "Chicken", options: ["Cake","Chicken","Milk","Rice"] },
  { question: "Complete: I drink ___. 🧃", answer: "juice", options: ["cheese","bread","juice","rice"] },
  { question: "What is ‘arroz’ in English?", answer: "Rice", options: ["Milk","Rice","Cake","Apple"] },
  { question: "Which food is sweet? 🍰", answer: "Cake", options: ["Chicken","Cheese","Cake","Rice"] },
];
const shuffle = (items) => [...items].sort(() => Math.random() - .5);

export default function EnglishFoodQuiz() {
  const navigate = useNavigate();
  const questions = useMemo(() => shuffle(bank).slice(0,8).map((q)=>({...q,options:shuffle(q.options)})), []);
  const [index,setIndex]=useState(0),[selected,setSelected]=useState(""),[checked,setChecked]=useState(false),[score,setScore]=useState(0),[hearts,setHearts]=useState(3);
  const current=questions[index],correct=selected===current.answer;
  const check=()=>{if(!selected||checked)return;setChecked(true);if(correct)setScore(v=>v+1);else setHearts(v=>Math.max(0,v-1));};
  const next=()=>{if(index===questions.length-1){navigate("/english/beginner/unit/6/reward",{state:{score:score+(checked?0:correct?1:0),total:questions.length,hearts:checked?hearts:correct?hearts:Math.max(0,hearts-1)}});return;}setIndex(v=>v+1);setSelected("");setChecked(false)};
  return <main className="food-screen">
    <header className="food-top"><button onClick={()=>navigate("/english/beginner/unit/6/game")}><ArrowLeft/><span>Juego</span></button><div><span>Food Quiz</span></div><div className="food-hearts">{[1,2,3].map(n=><Heart key={n} fill={n<=hearts?"currentColor":"none"}/>)}</div></header>
    <motion.section className="food-quiz-card" key={index} initial={{opacity:0,x:40}} animate={{opacity:1,x:0}}>
      <span className="quiz-count">Pregunta {index+1} de {questions.length}</span><div className="food-progress"><span style={{width:`${((index+1)/questions.length)*100}%`}}/></div><h1>{current.question}</h1>
      <div className="food-answer-list">{current.options.map(option=>{let className=selected===option?"selected":"";if(checked&&option===current.answer)className="correct";else if(checked&&selected===option)className="wrong";return <button key={option} disabled={checked} className={className} onClick={()=>setSelected(option)}><span>{option}</span>{checked&&option===current.answer&&<CheckCircle2/>}{checked&&selected===option&&option!==current.answer&&<XCircle/>}</button>})}</div>
      {checked&&<div className={`food-feedback ${correct?"right":"wrong"}`}>{correct?<><CheckCircle2/>¡Muy bien!</>:<><XCircle/>La respuesta correcta es <strong>{current.answer}</strong>.</>}</div>}
      {!checked?<button className="food-primary" disabled={!selected} onClick={check}>Comprobar</button>:<button className="food-primary" onClick={next}>{index===questions.length-1?"Ver recompensa":"Siguiente"}<ArrowRight/></button>}
    </motion.section>
  </main>;
}
