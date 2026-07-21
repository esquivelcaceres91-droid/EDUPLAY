export const worldsConfig = [
  { id:"english", name:"English World", route:"/english", image:"/assets/english-world.png", requiredPlan:"active", available:true, theme:"english" },
  { id:"computer", name:"Mundo de Computación", route:"/computer", image:"/assets/computer-world.png", requiredPlan:"active", available:true, theme:"computer" },
  { id:"math", name:"Mundo de Matemáticas", route:"/math", image:"/worlds/math/math-world.svg", requiredPlan:"annual", available:true, theme:"math" },
  { id:"science", name:"Mundo de Ciencias", route:"/science", image:"/worlds/science/world-placeholder.svg", requiredPlan:"annual", available:false, theme:"science" },
  { id:"geography", name:"Mundo de Geografía", route:"/geography", image:"/worlds/geography/world-placeholder.svg", requiredPlan:"annual", available:false, theme:"geography" },
];

export const getWorldConfig = (worldId) => worldsConfig.find((world) => world.id === worldId);
