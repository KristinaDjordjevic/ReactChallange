import { Auth } from '../components/Auth';

var api = 'https://l5ov8zep98.execute-api.us-west-2.amazonaws.com/api';

const Service = {

    // Fetch method POST
    post(url, params, cb){

        fetch(`${api}${url}`,
        {
            method: 'post',
            headers: {'Content-Type':'application/json'},
            body: JSON.stringify(params)
        })
        .then(result => result.json())
        .then(
            (result) => {
                if(cb){
                    cb(result);
                }
            },
            (error) => {

            }
        )
    },

    // Fetch method GET with Authorization token
    get(url, cb){
        fetch(`${api}${url}`, {
            method: 'GET',
            headers: new Headers({
              Authorization: `${Auth.token}`,
            }),
          })
        .then((result) => result.json())
        .then(
            (result) => {
                if(cb){
                    cb(result);
                }
            },
            (error) => {

            }
        )
    },

    // Fetch method POST with Authorization token
    postAuth(url, params, cb){

        fetch(`${api}${url}`,
        {
            method: 'post',
            headers: {
                'Content-Type':'application/json',
                Authorization: `${Auth.token}`
            },
            body: JSON.stringify(params)
        })
        .then(result => result.json())
        .then(
            (result) => {
                if(cb){
                    cb(result);
                }
            },
            (error) => {

            }
        )
    },
   
}

export default Service;