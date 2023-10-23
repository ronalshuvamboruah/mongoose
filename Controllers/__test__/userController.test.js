// const userController=require("../userController");
const userModel=require("../../Models/models");
// const generateAccessToken=require("../../Controllers/userController")
const jwt =require("jsonwebtoken")

//mock json webtoken library
jest.mock('jsonwebtoken');
describe('user controller',()=>{

    test("testing generate token method",()=>{
        
        function generateAccessToken(users){
            const expectedToken='mockToken';
            return   jwt.sign(users,"kkk",{"expiresIn": "15m"});
        }
      

        const user={name:"Ronal",password:"123",age:44};

        //call the function
        const accessToken=generateAccessToken(user);

        //Assertions

        expect(jwt.sign).toHaveBeenCalledWith({user},"kkk",{expiresIn:'15m'});

        expect(accessToken).toBe(expectedToken)
    })
})