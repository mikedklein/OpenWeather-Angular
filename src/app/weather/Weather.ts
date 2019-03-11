export class Weather {
  constructor(
    public city: string,
    public description: string,
    public temperature: number,
    public highTemp: number,
    public lowTemp: number
  ) {
    this.city = city;
    this.description = description;
    this.temperature = temperature;
    this.highTemp = highTemp;
    this.lowTemp = lowTemp;
  }
}
