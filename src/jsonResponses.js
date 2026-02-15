
const users = {};

const respondJSON = (request, response, statusCode, object) => {

    const content = JSON.stringify(object);

    const headers = {
        'Content-Type': 'application/json',
        'Content-Length': Buffer.byteLength(content, 'utf8'),
    };

    response.writeHead(statusCode, headers);

    //if it is not a head or 204 request, return the body's content
    if(request.method !== 'HEAD' && statusCode !== 204) {
        response.write(content);
    }

    response.end();

}


//return the list of users
const getUsers = (request, response) => {

    const responseJSON = {
        users,
    };

    //respond with 200 response with message
    return respondJSON(request, response, 200, responseJSON);
};


//add a new user
const addUser = (request, response ) => {

    const responseJSON = {
        message: 'Name and Age are both required',
    };

    const {name, age} = request.body;

    //check for the name and age fields
    if(!name || !age) {
        responseJSON.id = 'missingParams';
        return respondJSON(request, response, 400, responseJSON);
    }

    let responseCode = 204;

    //if the user doesn't exist yet
    if(!users[name]){
        responseCode = 201;

        users[name] = {
            name: name,
        };

    }

    users[name].age = age;

    if(responseCode === 201) {
        responseJSON.message = 'User Created Successfully';
        return respondJSON(request, response, responseCode, responseJSON);
    }


    return respondJSON(request, response, responseCode, {});


};

const notReal = (request, response) => {
    const responseJSON = {
        message: 'The page you were looking for was not found',
        id: 'notFound',
    };

    respondJSON(request, response, 404, responseJSON);
}

module.exports = {
    getUsers,
    addUser,
    notReal,
}
