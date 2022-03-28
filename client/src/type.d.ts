interface PlayerI {
    [key: string]

    _id?: string
    name: string
    surname: string
    position: string
    rating: number | string
    nationality: string
    height: number | string
    weight: number | string
    club: string
    tShirtNumber: number | string
    dateOfBirth: Date | string
    imageUrl: string
    createdAt?: string
    updatedAt?: string
}