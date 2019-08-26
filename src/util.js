import { createBrowserHistory } from 'history';

const util = {
    History: createBrowserHistory(),
    validateCPF: (cpf) => {
        cpf = cpf.replace(/[^0-9]/gi, '');

        if ((cpf = cpf.replace(/[^\d]/g, "")).length !== 11)
            return false;

        if (cpf === "00000000000")
            return false;

        let r;
        let s = 0;

        for (let i = 1; i <= 9; i++)
            s = s + Number(cpf[i - 1]) * (11 - i);

        r = (s * 10) % 11;

        if ((r === 10) || (r === 11))
            r = 0;

        if (r !== Number(cpf[9]))
            return false;

        s = 0;

        for (let i = 1; i <= 10; i++)
            s = s + Number(cpf[i - 1]) * (12 - i);

        r = (s * 10) % 11;

        if ((r === 10) || (r === 11))
            r = 0;

        if (r !== Number(cpf[10]))
            return false;

        return true;
    },
    getCurrentDate: () => {
        let date = new Date();
        let day = date.getDate();
        let month = date.getMonth() + 1;
        let year = date.getFullYear();
        let hour = date.getHours();
        let minutes = date.getMinutes();
        let seconds = date.getSeconds();

        if (day < 10) {
            day = '0' + day;
        }
        if (month < 10) {
            month = '0' + month;
        }
        if (hour < 10) {
            hour = '0' + hour;
        }
        if (minutes < 10) {
            minutes = '0' + minutes;
        }
        if (seconds < 10) {
            seconds = '0' + seconds;
        }

        return {
            day: day,
            month: month,
            year: year,
            hour: hour,
            minutes: minutes,
            seconds: seconds
        };
    },
    validateEmail: (email) => {
        let emailFormat = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;
        let result = email.match(emailFormat) ? true : false;

        return result;
    },
    validateBirthDate: (date) => {
        let newDate = date.replace(/\//g, "-");
        var newDateArray = newDate.split("-");

        if (newDateArray[0].length !== 4) {
            newDate = (
                newDateArray[2] + "-" +
                newDateArray[1] + "-" +
                newDateArray[0]
            );
        }

        let today = new Date();
        let birth = new Date(newDate);
        let age = today.getFullYear() - birth.getFullYear();;
        var month = today.getMonth() - birth.getMonth();
        if (month < 0 || (month === 0 && today.getDate() < birth.getDate())) age--;

        if (age < 18) {
            return false;
        }
        else {
            return true;
        }
    },
    loadScript: (url, callback) => {
        var script = document.createElement('script');
        script.onload = function () {
            callback();
        };

        script.async = false;
        script.src = url;
        document.getElementsByTagName("head")[0].appendChild(script);
    },
    convertNumberToCoin: (value) => {
        value = Number(value);
        value = value.toFixed(2).split('.');
        value[0] = value[0].split(/(?=(?:...)*$)/).join('.');
        return value.join(',');
    },
    validateCardDate: (month, year) => {
        let today = new Date();
        let someday = new Date();
        someday.setFullYear(year, month, 1);

        if (someday < today) {
            return false;
        }
        else {
            return true
        }
    },
    returnSlicedString: (string, begin, end) => {
        let slicedString = string.slice(begin, end);

        return slicedString;
    }
}

export default util; 