interface iObj {
    email: string;
    isBig: boolean;
}

// 3 声明合并
interface iObj {
    age: number;
}

interface iBusinessMan {
    account: string
}

type tName = {
    name: string;
}



// 1 使用 interface 扩展 interface
// 2 使用 type 扩展 interface
interface iObj extends iBusinessMan, tName {
    nickName: string;
}

interface IMethod {
    // 匿名的方式
    (name: string, email: string, isBig: boolean, age: number, nickName: string, account: string): iObj;
}


interface IDispalyMethod {
    // 显式的方式
    showResult: object;
}
interface iObj extends IDispalyMethod {

}



interface IStringArray {
    [index: number]: string;
}


let Obj: iObj;
Obj = {
    name: 'name',
    email: 're',
    isBig: false,
    age: 34,
    nickName: "nickName",
    account: "account",
    showResult: () => {
        return {}
    }
}



let method: IMethod;
method = function (name: string, email: string, isBig: boolean, age: number): iObj {
    return Obj;
}



let array: IStringArray;
array = ["a", "b", "c"]