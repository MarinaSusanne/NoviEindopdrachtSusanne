import jwt_decode from 'jwt-decode';


function fromTokentoDate (token) {
    const decodedToken = jwt_decode(token);
    console.log(decodedToken);
    const dateInUnix = decodedToken.exp;
    const dateNow = new Date().getTime();
    console.log(dateInUnix);

    if (dateInUnix - dateNow > 0 ) {
        return true
    } else {
        return false
    }

}
export default fromTokentoDate;