import { atom } from 'recoil'

export const accountState = atom({
  key: 'accountState',
  default: {
    accessToken: undefined,
    decodedAccessToken: undefined,
    role: 'user',
    email: undefined,
    name: undefined,
    picture: undefined
  },
})

export const editProductState = atom({
  key: 'editProduct',
  default: undefined
})

export const checkoutProductState = atom({
  key: 'checkoutProductState',
  default: undefined
})
