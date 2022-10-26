import { Recommend } from 'types/index'

const RECOMMENDS = [
  {
    id: 1,
    title: 'タイトル1',
    userId: 1,
    likes: [1],
    detail: '詳細詳細',
    images: [
      '/images/pic1.jpg',
      '/images/pic2.jpg',
      '/images/pic3.jpg',
      '/images/pic4.jpg'
    ],
    categoryId: 101,
    createdAt: '2022/10/1'
  },
  {
    id: 2,
    title: 'タイトル2タイトル2タイトル2タイトル2タイトル2タイトル2',
    userId: 1,
    likes: [1, 2, 1, 2, 1, 2, 1, 2, 1, 2],
    detail:
      '詳細2詳細2詳細2詳細2詳細2詳細2詳細2詳細2詳細2詳細2詳細2詳細2詳細2詳細2',
    images: ['/images/pic5.jpg', '/images/pic6.jpg'],
    categoryId: 102,
    createdAt: '2022/10/5'
  },
  {
    id: 3,
    title: 'タイトル3タイトル3タイトル3タイトル3タイトル3',
    userId: 1,
    likes: [1, 2],
    detail: '詳細3詳細3',
    images: ['/images/pic7.jpg'],
    categoryId: 108,
    createdAt: '2022/10/8'
  },
  {
    id: 4,
    title: 'タイトル4',
    userId: 1,
    likes: [1, 2, 3, 4],
    detail: '詳細4詳細4',
    images: [],
    categoryId: 109,
    createdAt: '2022/9/27'
  }
]

export const useRecommend = () => {
  return {
    getRecommends(): Recommend[] {
      return RECOMMENDS
    },
    getRecommend(id: number): Recommend | undefined {
      const found = RECOMMENDS.find((recommend) => recommend.id === id)
      return found
    }
  }
}
