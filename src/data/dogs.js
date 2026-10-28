import dog2 from '../assets/imgs/dog2.jpg'
import dog3 from '../assets/imgs/dog3.jpg'
import dog4 from '../assets/imgs/dog4.jpg'
import dog5 from '../assets/imgs/dog5.webp'
// 狗狗数据
export const dogs = [
  {
    id: 1,
    name: "Buddy",
    breed: "小狗",
    age: 1,
    gender: "公",
    personality: ["友善", "活泼", "聪明"],
    description: "Buddy是一只非常友善的拉布拉多，喜欢和小朋友玩耍，对陌生人也很友好。它非常聪明，学会了很多指令。",
    image: "https://images.pexels.com/photos/1108099/pexels-photo-1108099.jpeg?auto=compress&cs=tinysrgb&w=600&h=400",
    featured: true
  },
  {
    id: 2,
    name: "Luna",
    breed: "博美犬",
    age: 3,
    gender: "母",
    personality: ["温顺", "忠诚", "耐心"],
    description: "Luna是一只温顺的小狗，非常忠诚于主人。它对其他动物也很友好，适合有小孩的家庭。",
    image: dog2,
    featured: true
  },
  {
    id: 3,
    name: "Max",
    breed: "萨摩耶犬",
    age: 4,
    gender: "公",
    personality: ["勇敢", "警惕", "忠诚"],
    description: "Max是一只勇敢的犬，非常警惕，是很好的护卫犬。同时它也非常忠诚，会保护自己的家人。",
    image: dog3,
    featured: false
  },
  {
    id: 4,
    name: "Coco",
    breed: "德国牧羊犬",
    age: 1,
    gender: "母",
    personality: ["活泼", "聪明", "粘人"],
    description: "Coco是一只活泼可爱的犬，非常聪明，容易训练。它很粘人，喜欢时时刻刻和主人在一起。",
    image: dog4,
    featured: true
  },
  {
    id: 5,
    name: "Rocky",
    breed: "德国牧羊犬",
    age: 5,
    gender: "公",
    personality: ["沉稳", "友善", "独立"],
    description: "Rocky看起来很凶，但实际上非常友善。它性格沉稳，不需要太多运动，适合在公寓里饲养。",
    image: dog5,
    featured: false
  }
];