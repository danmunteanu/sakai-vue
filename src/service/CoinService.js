export const CoinService = {
    getData() {
        return [
			{ id: 1, name: 'Romanian LEU', code: 'RON' },
			{ id: 2, name: 'EURO', code: 'EUR' },
			{ id: 3, name: 'American Dollar', code: 'USD' },
			{ id: 4, name: 'Hungarian Forint', code: 'HUF' },
        ];
    },

    getCoins() {
        return Promise.resolve(this.getData());
    }
};
