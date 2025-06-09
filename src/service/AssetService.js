export const AssetService = {
    getData() {
        return [
			{ name: 'Alpha', amount: 57000, description: 'Bani Apartament & B4', coin_id: 2 },
			{ name: 'FFA', amount: 3001, description: 'Financial Freedom Account', coin_id: 1 },
			{ name: 'Ochelari', amount: 650, description: 'Bani de ochelari', coin_id: 1 }
        ];
    },

    getAssets() {
        return Promise.resolve(this.getData());
    }
};
