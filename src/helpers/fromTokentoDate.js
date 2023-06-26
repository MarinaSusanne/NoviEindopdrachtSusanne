import jwt_decode from 'jwt-decode';


function fromTokentoDate (token) {
    const decodedToken = jwt_decode(token);
    console.log(decodedToken);
    const dateInUnix = decodedToken.exp;
    const dateNow = new Date().getTime();
        if (dateInUnix * 1000 - dateNow > 0 ) {
        return true
    } else {
        return false
    }

}
export default fromTokentoDate;