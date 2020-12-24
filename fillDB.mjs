import axios from "axios";

for (let i = 0; i <50 ; i++) {
    const body = {
        title: "My Movie",
        description: "Description of Movie",
        duration: 120,
        yearOfPublished: 2020,
    };
    axios
        .post("http://0.0.0.0:8000/api/movies/", body)
        .then((res) => console.log(res.data))
        .catch((e) => console.log(e));

}

