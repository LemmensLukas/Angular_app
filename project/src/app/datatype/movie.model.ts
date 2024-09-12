export class Movie {
  constructor(
    public id?: string,
    public title: string = "",
    public author: string = "",
    public img: string = "",
    public genre: string = "",
    public rating: number = 0,
    public description: string = "",
    public releaseDate: Date = new Date(),
    public bookmarked: boolean = false,
    ){}
}
