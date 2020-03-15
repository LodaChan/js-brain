type tName = {
    name: string;
}
// 不能自动合并，会出错
// type tName = {
//     age: number;
// }

interface iObj {
    name: string;
    email: string;
    isBig: boolean;
    age: number;
}

// 使用 type 扩展 type
type User = tName & { age: number };

// 使用 interface 扩展 type
type UserObj = iObj & { age: number };




// 基本类型别名
type tSring = string


interface Dog {
    wong();
}
interface Cat {
    miao();
}

// 联合类型
type Pet = Dog | Cat

// 元祖，具体定义数组每个位置的类型
type PetList = [Dog, Pet]


// // 一些 type 的神奇用法
// type StringOrNumber = string | number; 
// type Text = string | { text: string }; 
// type NameLookup = Dictionary<string, Person>; 
// type Callback<T> = (data: T) => void; 
// type Pair<T> = [T, T]; 
// type Coordinates = Pair<number>; 
// type Tree<T> = T | { left: Tree<T>, right: Tree<T> };