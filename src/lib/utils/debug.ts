export const hasTypos = (name: string): boolean => {
	return / {2,}/.test(name) || /^\s/.test(name) || /\s$/.test(name) || /^[a-zа-я]/.test(name);
};
