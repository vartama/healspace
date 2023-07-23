const errorHandling = (err, req, res, next) => {
    console.log(err)
    let message = 'Internal Server Error'
    let statusCode = 500
    switch (err.name) {
        case 'LoginEmptyEmail':
            statusCode = 400
            message = 'Email is required'
            break;
        case 'LoginInvalidEmail':
            statusCode = 400
            message = 'Email is invalid'
            break;
        case 'LoginEmptyPassword':
            statusCode = 400
            message = 'Password is required'
            break;
        case 'LoginError':
            statusCode = 401
            message = 'invalid email or password'
            break;
        case 'RegisterEmptyEmail':
            statusCode = 400
            message = 'Email is required'
            break;
        case 'RegisterInvalidEmail':
            statusCode = 400
            message = 'Email is invalid'
            break;
        case 'RegisterEmptyPassword':
            statusCode = 400
            message = 'Password is required'
            break;
        case 'RegisterEmptyFullName':
            statusCode = 400
            message = 'Full Name is required'
            break;
        case 'RegisterEmptyGender':
            statusCode = 400
            message = 'Gender is required'
            break;
        case 'RegisterEmptyDateOfBirth':
            statusCode = 400
            message = 'Date of birth is required'
            break;
        case 'RegisterEmptyPhoneNumber':
            statusCode = 400
            message = 'Phone Number is required'
            break;
        case 'RegisterUniqueEmail':
            statusCode = 400
            message = 'Email must be unique'
            break;
        case 'UpdateUserEmptyEmail':
            statusCode = 400
            message = 'Email is required'
            break;
        case 'UpdateUserInvalidEmail':
            statusCode = 400
            message = 'Email is invalid'
            break;
        case 'UpdateUserEmptyPassword':
            statusCode = 400
            message = 'Password is required'
            break;
        case 'UpdateUserEmptyFullName':
            statusCode = 400
            message = 'Full Name is required'
            break;
        case 'UpdateUserEmptyGender':
            statusCode = 400
            message = 'Gender is required'
            break;
        case 'UpdateUserEmptyDateOfBirth':
            statusCode = 400
            message = 'Date of birth is required'
            break;
        case 'UpdateUserEmptyPhoneNumber':
            statusCode = 400
            message = 'Phone Number is required'
            break;
        case 'UpdateUserUniqueEmail':
            statusCode = 400
            message = 'Email must be unique'
            break;
        case 'BookmarkAlreadyExist':
            statusCode = 400
            message = 'Already bookmarked'
            break;
        case 'HotelEmptyRating':
            statusCode = 400
            message = 'Rating is required'
            break;
        case 'OrderEmptyHotelRoomId':
            statusCode = 400
            message = 'Hotel Room Id is required'
            break;
        case 'OrderEmptyTotalPrice':
            statusCode = 400
            message = 'Total Price is required'
            break;
        case 'OrderEmptyCheckInAt':
            statusCode = 400
            message = 'CheckInAt is required'
            break;
        case 'OrderEmptyCheckOutAt':
            statusCode = 400
            message = 'CheckOutAt is required'
            break;
        case 'OrderEmptyCustomerName':
            statusCode = 400
            message = 'Customer Name is required'
            break;
        case 'OrderEmptyCustomerEmail':
            statusCode = 400
            message = 'Customer Email is required'
            break;
        case 'OrderEmptyCustomerPhoneNumber':
            statusCode = 400
            message = 'Customer Phone Number is required'
            break;
        case 'UpdateOrderEmptyStatus':
            statusCode = 400
            message = 'Status is required'
            break;
        case 'HotelEmptyName':
            statusCode = 400
            message = 'Name is required'
            break;
        case 'HotelEmptyDescription':
            statusCode = 400
            message = 'Description is required'
            break;
        case 'HotelEmptyPhoneNumber':
            statusCode = 400
            message = 'Phone Number is required'
            break;
        case 'HotelEmptyMainImage':
            statusCode = 400
            message = 'Main Image is required'
            break;
        case 'HotelEmptyLocation':
            statusCode = 400
            message = 'Location is required'
            break;
        case 'HotelEmptyLat':
            statusCode = 400
            message = 'Lat is required'
            break;
        case 'HotelEmptyLong':
            statusCode = 400
            message = 'Long is required'
            break;
        case 'FacilityEmptyName':
            statusCode = 400
            message = 'Name is required'
            break;
        case 'FacilityEmptyType':
            statusCode = 400
            message = 'Type is required'
            break;
        case 'Unauthenticated':
            statusCode = 401
            message = 'Error authentication'
            break;
        case 'NotFound':
            statusCode = 404
            message = 'Data not found'
            break;
        default:
            statusCode = 500
            message = 'Internal Server Error'
            break;
    }
    res.status(statusCode).json({
        statusCode,
        error: { message }
    })
}

module.exports = errorHandling