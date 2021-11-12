import { FilmsDescription } from "../../types/films";
import faker from 'faker';

export const makeFakeFilmsList = ():FilmsDescription[] => ([{
    id: faker.datatype.number(),
    name: faker.name.title(),
    genre: faker.music.genre(),
    posterImage: faker.system.filePath(),
    previewImage: faker.system.filePath(),
    backgroundImage: faker.system.filePath(),
    backgroundColor: faker.internet.color(),
    videoLink: faker.internet.url(),
    previewVideoLink: faker.internet.url(),
    description: faker.lorem.text(),
    rating: faker.datatype.number(),
    scoresCount: faker.datatype.number(),
    director: faker.name.findName(),
    starring: [faker.name.findName(), faker.name.findName()],
    runTime: faker.datatype.number(),
    released: faker.random.word(),
    isFavorite: faker.datatype.boolean(),

},
{
    id: faker.datatype.number(),
    name: faker.name.title(),
    genre: faker.music.genre(),
    posterImage: faker.system.filePath(),
    previewImage: faker.system.filePath(),
    backgroundImage: faker.system.filePath(),
    backgroundColor: faker.internet.color(),
    videoLink: faker.internet.url(),
    previewVideoLink: faker.internet.url(),
    description: faker.lorem.text(),
    rating: faker.datatype.number(),
    scoresCount: faker.datatype.number(),
    director: faker.name.findName(),
    starring: [faker.name.findName(), faker.name.findName()],
    runTime: faker.datatype.number(),
    released: faker.random.word(),
    isFavorite: faker.datatype.boolean(),

}])