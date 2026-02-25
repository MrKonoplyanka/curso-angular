
interface AudioPlayer{
    audioVolume: number;
    songDuration: number;
    songTitle: string;
    details:Details;
}
interface Details{
    author: string;
    year: number;
}

const audioPlayer:AudioPlayer={
    audioVolume: 90,
    songDuration: 36,
    songTitle: 'Mess',
    details:{
        author: 'Ed Sheeran',
        year: 2015
    }
}

const {songTitle:anotherSong, songDuration:duration, songTitle:title, details:details} = audioPlayer;
const {author:author, year:year} = details;

console.log('Song: ', anotherSong);
console.log('Duration: ', duration);
console.log('Title: ', title);
console.log('Author: ', author);
console.log('Year: ', year);

const [p1,p2,p3='Not found']:string[] = ['Goku', 'Vegeta','Trunks'];

console.log('Personaje 3: ', p3);
export{}