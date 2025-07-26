# share-utils project

This project contains the common utils used in market service and dummydata project.

## ParamValidator

This class defines the function which used to validate the param of request.

| Name | Description | Usage |
| --- | --- | --- |
| validateGetAllStockParam | Check the param of page, limit, sort, order | `validateGetAllStockParam(req)` |
| validateGetAllFundParam | Check the param of page, limit, sort, order | `validateGetAllFundParam(req)`|
| validateCode | Check the param of stock code or fund code | `validateCode(code)` |

## ErrorHandler

This function defines the function which used to handle the error.

| Name | Description | Usage |
| --- | --- | --- |
| errorHandler | catch the bussiness error and generate the error response | `errorHandler(error)` |

## ResponseFormatter

This class defines the function which used to generate the response.

| Name | Description | Usage |
| --- | --- | --- |
| successResponse | generate the success response | `successResponse(res, data, message)` |
| errorResponse | generate the error response | `errorResponse(res, message)` |