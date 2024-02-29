console.log("hello world");

interface State {
  nickname: string;
}

class Government implements State {
  private readonly personalID: number;
  protected birthName: string;
  public nickname: string;
  constructor() {
    this.personalID = 12345;
    this.birthName = "John";
    this.nickname = "";
  }

  getPersonalID() {
    return this.personalID;
  }
  getProtectedBirthCertificate() {
    return this.birthName;
  }
}

class PublicHall extends Government {
  constructor() {
    super();
  }

  setProtectedName(newName: string) {
    this.birthName = newName;
  }
}

class Citizen extends PublicHall {
  constructor() {
    super();
  }

  setNickname(target: State, name: string) {
    target.nickname = name;
  }
}
const johnWalker = new Citizen();
johnWalker.setProtectedName("paul");

const scotish = new Citizen();
scotish.setNickname(johnWalker, "whis-key");
console.log(johnWalker.nickname); // whis-key
