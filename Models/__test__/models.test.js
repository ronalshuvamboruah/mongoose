const userModel=require("../models");


describe("testing user models",()=>{
test("lets check the usermodel",()=>{
    const user= new userModel({
        name:'Ronal',
        password:"!@3",
        age:44,
        accessToken:"123",
        refreshToken:"123"
    })
   expect(user.name).toBe("Ronal");
   expect(user.password).toBe("!@3");
   expect(user.age).toBe(44);
   expect(user.accessToken).toBe("123");
   expect(user.refreshToken).toBe("123")
})
})