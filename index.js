"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
function form() {
    function htmlSelectors() {
        const selector = (id) => document.getElementById(id);
        return {
            inputName: selector("inputName"),
            inputUserName: selector("inputUserName"),
            inputEmail: selector("inputEmail"),
            inputAddress: selector("inputAddress"),
            inputAddressComplement: selector("inputAddressComplement"),
            typePhone: selector("typePhone"),
            inputZip: selector("inputZip"),
            inputCity: selector("inputCity"),
            inputCompanyName: selector("inputCompanyName"),
            typeURL: selector("typeURL"),
            getDataBtn: selector("getDataBtn"),
            sendDataBtn: selector("sendDataBtn"),
        };
    }
    function updateUser(user) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let response = yield fetch(`https://jsonplaceholder.typicode.com/users/${user.id}`, {
                    method: "PUT",
                    body: JSON.stringify(user),
                    headers: {
                        "Content-type": "application/json; charset=UTF-8",
                    },
                });
                return yield response.json();
            }
            catch (err) {
                console.error(err);
            }
        });
    }
    function handleUpdateUser(event) {
        return __awaiter(this, void 0, void 0, function* () {
            event.preventDefault();
            const { inputName, inputUserName, inputEmail, inputAddress, inputAddressComplement, typePhone, inputZip, inputCity, inputCompanyName, typeURL } = htmlSelectors();
            const saveUser = yield updateUser({
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
            if (saveUser === null || saveUser === void 0 ? void 0 : saveUser.id) {
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
                alert("Dados enviados com sucesso!");
            }
        });
    }
    function getUser(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let response = yield fetch(`https://jsonplaceholder.typicode.com/users/${userId}`);
                return yield response.json();
            }
            catch (err) {
                console.error(err);
            }
        });
    }
    function logRandomUser(event) {
        return __awaiter(this, void 0, void 0, function* () {
            event.preventDefault();
            const firstUser = yield getUser(10);
            const allSelectors = htmlSelectors();
            if (!firstUser)
                return;
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
        });
    }
    function setupButtonHandlers() {
        const { sendDataBtn, getDataBtn } = htmlSelectors();
        getDataBtn.addEventListener("click", logRandomUser);
        sendDataBtn.addEventListener("click", handleUpdateUser);
    }
    function init() {
        setupButtonHandlers();
    }
    return {
        init,
        logRandomUser,
    };
}
form().init();
