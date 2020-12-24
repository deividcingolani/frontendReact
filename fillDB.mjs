import axios from "axios";

for (let i = 0; i < 20; i++) {
    const body ={
        title: "My Movie",
        description: "This is my Movie 1",
        duration: 120,
        yearOfPublished: 2020
    }
    // axios
    //     .post("http://0.0.0.0:8000/api/movies/", {
    //         credentials: "omit",
    //         headers: {
    //             "User-Agent":
    //                 "Mozilla/5.0 (X11; Linux x86_64; rv:85.0) Gecko/20100101 Firefox/85.0",
    //             Accept: "application/json, text/plain, */*",
    //             "Accept-Language": "en-US,en;q=0.5",
    //             "Content-Type": "application/json;charset=utf-8",
    //         },
    //         referrer: "http://localhost:3021/",
    //         body:JSON.stringify(body),
    //         method: "POST",
    //         mode: "cors",
    //     })
    //     .then((res) => console.log(res.data))
    //     .catch((e) => console.log(e));

}