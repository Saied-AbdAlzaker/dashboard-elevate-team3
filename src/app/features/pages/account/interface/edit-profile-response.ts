export interface EditProfileResponse {
  message: string
  user: User
}

 interface User {
  _id: string
  firstName: string
  lastName: string
  email: string
  password: string
  gender: string
  phone: string
  photo: string
  role: string
  wishlist: any[]
  addresses: any[]
  createdAt: string
}
