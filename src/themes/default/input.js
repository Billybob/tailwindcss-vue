export default {
	base: 'appearance-none block w-full border rounded leading-tight focus:outline-none',
	state: {
		default: 'bg-gray-100 text-gray-700 border-gray-300 focus:border-primary-400',
		disabled: 'bg-gray-200 text-gray-700 border-gray-300',
		readonly: 'bg-gray-200 text-gray-700 border-gray-300',
		success: 'bg-success-100 text-gray-700 border-success-300 focus:border-success-400',
		error: 'bg-danger-100 text-gray-700 border-danger-300 focus:border-danger-400'
	},
	size: {
		default: 'py-2 px-3',
		sm: 'py-1 px-2',
		lg: 'py-3 px-4'
	}
};
