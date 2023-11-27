import { atom } from 'recoil'

export const accountState = atom({
  key: 'accountState',
  default: {
    accessToken: '',
    decodedAccessToken: '',
    role: '',
  },
})
