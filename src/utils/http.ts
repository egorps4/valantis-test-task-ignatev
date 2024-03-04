import axios from "axios";
import { md5 } from 'js-md5';
import getFormatedDate from "./getFormatedDate";

const PASSWORD = 'Valantis';
const HASH = md5(`${PASSWORD}_${getFormatedDate(new Date())}`);

const $api = axios.create({
    headers: {
        'X-Auth': HASH,
    },
});

export default $api;
