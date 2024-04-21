import axios from 'axios'

const service = axios.create({
	baseURL: 'https://jsonplaceholder.typicode.com',
	timeout: 3000,
	withCredentials: true,
})

service({
	url: '/todos/1',
	// params:
}).then(({ data }) => {
	console.log(data)
})