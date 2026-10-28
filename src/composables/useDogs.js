import { reactive, computed } from 'vue'
import { dogs as seedDogs } from '@/data/dogs'

// 启动时用 localStorage 中的收养记录回填 adopted 状态，保证刷新后数据不丢失
const records = JSON.parse(localStorage.getItem('adoptionRecords') || '[]')
const adoptedIds = new Set(records.map((r) => r.dog && r.dog.id))

const dogs = reactive(seedDogs.map((d) => ({ ...d, adopted: adoptedIds.has(d.id) })))

export function useDogs() {
  const adoptedDogs = computed(() => dogs.filter((d) => d.adopted))

  const getDogById = (id) => dogs.find((d) => d.id === Number(id))

  const adopt = (id, adopter) => {
    const dog = getDogById(id)
    if (!dog || dog.adopted) return false
    dog.adopted = true
    records.push({
      dog: { ...dog },
      adopter: { ...adopter },
      adoptionDate: new Date().toISOString(),
    })
    localStorage.setItem('adoptionRecords', JSON.stringify(records))
    return true
  }

  return { dogs, adoptedDogs, getDogById, adopt }
}
