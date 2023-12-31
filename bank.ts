import inquirer from 'inquirer';
import chalk from 'chalk';
//coutomer Class
let option;
class Customer  {
    firstName:string
    lastName:string
    age:number
    gender:string
    mobNumber:number
    acountNum:number
    blance:number
    constructor (
        fName:string,
        lName:string,
        age:number,
        gender:string,
        mob:number,
        accNum:number,
        balance:number
    ){
        this.firstName=fName
        this.lastName=lName
        this.age=age
        this.mobNumber=mob
        this.gender=gender
        this.acountNum=accNum
        this.blance=balance
    }
};
//interface of Bnak Account
interface BankAcccount{
    accountNumber:number,
    balance:number
};
// class bank
class Bank{
   customer:Customer[]=[];
   account:BankAcccount[]=[];
   addCustomer(obj:Customer){
    this.customer.push(obj);
   };
   addAccount(obj:BankAcccount){
    this.account.push(obj);
   }
   transection(accObj:BankAcccount){
    let newAccount = this.account.filter(
        (acc)=>acc.accountNumber!==accObj.accountNumber
    );
    this.account = [...newAccount,accObj]
   };

};
let myBank = new Bank();

//creat custoomer
   do{ 
    let fName =  await inquirer.prompt({
        type:"input",
        name:"name",
        message:"What is your first name"
    });
    let lName = await inquirer.prompt({
        type:"input",
        name:"name",
        message:"What is your last name"
    });
    let gender = await inquirer.prompt({
        type:"input",
        name:"uGender",
        message:"What is your Gender"
    });
    let age = await inquirer.prompt({
        type:"number",
        name:"age",
        message:"What is your age"
    });
    let mobNumber = await inquirer.prompt({
        type:"number",
        name:"mobNumber",
        message:"What is your mobile Number"
    });
    let accNum = await inquirer.prompt({
        type:"number",
        name:"account",
        message:"What is your Account Number"
    });
    let balance = await inquirer.prompt({
        type:"number",
        name:"balance",
        message:"What is your balance"
    });
   const choice = await inquirer.prompt([{
        type : "confirm",
        name : "slection",
        message : "Add another cutomer pres y for yes or n for no",
        default : false,
    }]);
    if(choice.slection){
        option = 'y';
    }else{
        option = 'n';
    }
    const cus = new Customer(fName.name,lName.name,gender.uGender,age.age,mobNumber.mobNumber,accNum.account,balance.balance);
    myBank.addCustomer(cus);
   myBank.addAccount({ accountNumber:cus.acountNum,balance:cus.blance}); 
    
     } while (option.toLowerCase()==="y");
     // Bank funtionality
     async function bankServices(bank:Bank) {
        const service = await inquirer.prompt({
            type:"list",
            name:"slection",
            message:"please select a service ",
            choices:["view Blance", "WithDrwal Cash", "Deposit cash","Exit"]
        });
        //view Balance
      if(service.slection=="view Blance"){
        let res = await inquirer.prompt({
            type:"input",
            name:"resName",
            message:"Please enter your account number"
        });
        let account = myBank.account.find((accNum)=>accNum.accountNumber==res.resName)
        if(!account){
            console.log(chalk.red.bold("Invalid Account Number"))
        }
        if(account){
            let name = myBank.customer.find(
                (item:any)=>item.acountNum==account?.accountNumber
            )
            console.log(`Dear ${chalk.blue.italic(name?.firstName)}  ${chalk.blue.italic(name?.lastName)}
            your acount balnce is
             ${chalk.green.italic("$", account.balance)} 
              ` 
              )
              return name;
        }
      };
      //WithDrwal Cash
      if(service.slection=="WithDrwal Cash"){
        let res = await inquirer.prompt({
            type:"input",
            name:"resName",
            message:"What is your Account Number"
        });
        
        let account = myBank.account.find((accNum)=>accNum.accountNumber==res.resName)
        if(!account){
            console.log(chalk.red.bold("Invalid Account Number"))
        };
        if(account){
            let ans = await inquirer.prompt({
                type:"number",
                message:"Please enter your Amount" ,
                name:"rupee"  
            });
            if(ans.rupee>account.balance){
                console.log("insufficient Blance")
            }
            let newBalance:number= account.balance - ans.rupee
            // transection mathod
          bank.transection({
            accountNumber:account.accountNumber,
            balance:newBalance})
            if(ans.rupee>account.balance){
                return account;
            }
        }
        return account;
      };
      //Deposit Cash
       if(service.slection=="Deposit cash"){
        let res = await inquirer.prompt({
            type:"input",
            name:"resName",
            message:"What is your Account Number"
        });
        let account = myBank.account.find((accNum)=>accNum.accountNumber==res.resName)
        if(!account){
            console.log(chalk.red.bold("Invalid Account Number"))
        };
        if(account){
            let ans = await inquirer.prompt({
                type:"number",
                message:"Please enter your Amount" ,
                name:"rupee"  
            });
            let newBalance:number= account.balance + ans.rupee
            // transection mathod
          bank.transection({
            accountNumber:account.accountNumber,
            balance:newBalance})
            
        }
        return account;
      };
      if(service.slection=="Exit"){
        console.log("thank you for using Our Bank")
    }
}
bankServices(myBank);

    
