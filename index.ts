import inquirer from "inquirer";
import dayjs from 'dayjs';

let now = dayjs();
let currentDate = now.format('YYYY-MM-DD'); 
let currentTime = now.format('HH:mm:ss');

class to_do_list {
  private toDoList: string[];
  private date: string[];
  private time: string[];

  constructor(toDoList: string[] = [], date: string[] = [], time: string[] = []) {
    this.toDoList = toDoList;
    this.date = date;
    this.time = time;
  }

  public getToDoList(): string[] {
    return this.toDoList;
  }

  public addItems(toDoList: string[]): void {
    if (this.toDoList.length > 0) {
      now = dayjs();
      currentDate = now.format('YYYY-MM-DD'); 
      currentTime = now.format('HH:mm:ss');
      this.toDoList.push(...toDoList);
      this.date.push(...Array(toDoList.length).fill(currentDate));
      this.time.push(...Array(toDoList.length).fill(currentTime));
    } else {
      this.toDoList = toDoList;
      now = dayjs();
      currentDate = now.format('YYYY-MM-DD'); 
      currentTime = now.format('HH:mm:ss');
      this.date = Array(toDoList.length).fill(currentDate);
      this.time = Array(toDoList.length).fill(currentTime);
    }
  }

  public showToDoList(): void {
    if (this.toDoList.length === 0) {
      console.log("No to-dos at the moment");
    } else {
        for (let i = 0; i < this.toDoList.length; i++) {
        
        console.log(`  ${i} | ${this.toDoList[i]} |------last visited at---------- |${this.date[i]} | ${this.time[i]}|`);
      }
    }
  }

  public deleteItems(deleteList: number[]): void {
    console.log("Enter the indexes of the items you want to delete");
    for (let i = deleteList.length - 1; i >= 0; i--) {
      this.toDoList.splice(deleteList[i], 1);
      this.date.splice(deleteList[i], 1);
      this.time.splice(deleteList[i], 1);
    }
  }
  public updateItems(index: number,todo:string): void {
    this.toDoList[index] = todo;
    now = dayjs();
    currentDate = now.format('YYYY-MM-DD');
    currentTime = now.format('HH:mm:ss');
    this.date[index] = currentDate;
    this.time[index] = currentTime;
  }

        
};
async function main() {
  let t = new to_do_list();

  while (true) {
    console.log("1) Insert");
    console.log("2) Update");
    console.log("3) Delete");
    console.log("4) Show");
    console.log("5) Exit");

    const { operation } = await inquirer.prompt([
      {
        type: "list",
        name: "operation",
        message: "What operation do you want to do?",
        choices: [1, 2, 3, 4, 5],
      },
    ]);

    switch (operation) {
      case 1:
        const { list } = await inquirer.prompt([
          {
            type: "input",
            name: "list",
            message: "Enter to-dos (comma-separated)",
          },
        ]);
        const toDoArray = list.split(",").map((toDos: string) => toDos.trim());
        t.addItems(toDoArray);
        break;
      case 2:
        t.showToDoList();
        const  index  = await inquirer.prompt([
            {
              type: "input",
              name: "index",
              message: "Enter index to update",
            },
         ]);
         const  toDo  = await inquirer.prompt([
            {
              type: "input",
              name: "toDo",
              message: "Enter the updated to-do",
            },
         ]);
         
          t.updateItems(Number(index.index),toDo.toDo);
          break;  
      case 3:
        t.showToDoList();
        const { deleteList } = await inquirer.prompt([
          {
            type: "input",
            name: "deleteList",
            message: "Enter indices to delete (comma-separated)",
          },
        ]);
        const delToDos = deleteList.split(",").map((index: string) => Number(index.trim()));
        t.deleteItems(delToDos);
        break;
      case 4:
        t.showToDoList();
        break;
      case 5:
        return;
      default:
        console.log("Invalid choice");
    }
  }
}

main();