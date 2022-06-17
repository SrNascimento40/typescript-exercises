interface Address {
  street: string;
  suite: string;
  city: string;
  zipcode: string;
}

interface Company {
  name: string;
}

interface User {
  id: number;
  name: string;
  username: string;
  email: string;
  address: Address;
  phone: string;
  website: string;
  company: Company;
}

function form() {
  function htmlSelectors() {
    const selector = (id: string) => document.getElementById(id);

    return {
      inputName: selector("inputName") as HTMLInputElement,
      inputUserName: selector("inputUserName") as HTMLInputElement,
      inputEmail: selector("inputEmail") as HTMLInputElement,
      inputAddress: selector("inputAddress") as HTMLInputElement,
      inputAddressComplement: selector("inputAddressComplement") as HTMLInputElement,
      typePhone: selector("typePhone") as HTMLInputElement,
      inputZip: selector("inputZip") as HTMLInputElement,
      inputCity: selector("inputCity") as HTMLInputElement,
      inputCompanyName: selector("inputCompanyName") as HTMLInputElement,
      typeURL: selector("typeURL") as HTMLInputElement,
      getDataBtn: selector("getDataBtn") as HTMLButtonElement,
      sendDataBtn: selector("sendDataBtn") as HTMLButtonElement,
    };
  }

  async function updateUser(user: User): Promise<User | undefined> {
    try {
      let response = await fetch(
        `https://jsonplaceholder.typicode.com/users/${user.id}`,
        {
          method: "PUT",
          body: JSON.stringify(user),
          headers: {
            "Content-type": "application/json; charset=UTF-8",
          },
        }
      );
      return await response.json();
    } catch (err) {
      console.error(err);
    }
  }

  async function handleUpdateUser(event: Event) {
    event.preventDefault();
    const { inputName, inputUserName, inputEmail, inputAddress, inputAddressComplement, typePhone, inputZip, inputCity, inputCompanyName, typeURL } =
      htmlSelectors();

    const saveUser = await updateUser({
      id: 1,
      name: inputName.value,
      username: inputUserName.value,
      email: inputEmail.value,
      address: {
        street: inputAddress.value,
        suite: inputAddressComplement.value,
        city: inputCity.value,
        zipcode: inputZip.value,
      },
      phone: typePhone.value,
      website: typeURL.value,
      company: {
        name: inputCompanyName.value,
      },
    });

    if (saveUser?.id) {
      inputUserName.value = "";
      inputName.value = "";
      inputEmail.value = "";
      inputAddress.value = "";
      inputAddressComplement.value = "";
      typePhone.value = "";
      inputZip.value = "";
      inputCity.value = "";
      inputCompanyName.value = "";
      typeURL.value = "";

      alert("Dados enviados com sucesso!")
    }
  }

  async function getUser(userId: number): Promise<User | undefined> {
    try {
      let response = await fetch(
        `https://jsonplaceholder.typicode.com/users/${userId}`
      );
      return await response.json();
    } catch (err) {
      console.error(err);
    }
  }

  async function logRandomUser(event: Event): Promise<void> {
    event.preventDefault();
    const firstUser = await getUser(10);
    const allSelectors = htmlSelectors();
    if (!firstUser) return;
    allSelectors.inputName.value = firstUser.name;
    allSelectors.inputUserName.value = firstUser.username;
    allSelectors.inputEmail.value = firstUser.email;
    allSelectors.typePhone.value = firstUser.phone;
    allSelectors.inputAddress.value = firstUser.address.street;
    allSelectors.inputAddressComplement.value = firstUser.address.suite;
    allSelectors.inputZip.value = firstUser.address.zipcode;
    allSelectors.inputCity.value = firstUser.address.city;
    allSelectors.inputCompanyName.value = firstUser.company.name;
    allSelectors.typeURL.value = firstUser.website;
  }

  function setupButtonHandlers(): void {
    const { sendDataBtn, getDataBtn } = htmlSelectors();
    getDataBtn.addEventListener("click", logRandomUser);
    sendDataBtn.addEventListener("click", handleUpdateUser);
  }

  function init(): void {
    setupButtonHandlers();
  }
  return {
    init,
    logRandomUser,
  };
}
form().init();
