<script setup>
import { AssetService } from '@/service/AssetService';
import { CoinService } from '@/service/CoinService';
import { FilterMatchMode, FilterOperator } from '@primevue/core/api';
import { onBeforeMount, reactive, ref } from 'vue';

const assets = ref(null);
const coins = ref(null);
const filters = ref(null);
const loading1 = ref(null);
const expandedRows = ref([]);
const statuses = reactive(['unqualified', 'qualified', 'new', 'negotiation', 'renewal', 'proposal']);

onBeforeMount(() => {
    AssetService.getAssets().then((data) => (assets.value = data));
	CoinService.getCoins().then((data) => (coins.value = data));
	
	//ProductService.getProductsWithOrdersSmall().then((data) => (products.value = data));
    /*CustomerService.getCustomersLarge().then((data) => {
        customers1.value = data;
        loading1.value = false;
        customers1.value.forEach((customer) => (customer.date = new Date(customer.date)));
    });*/

    initfilters();
});

function initfilters() {
    filters.value = {
        global: { value: null, matchMode: FilterMatchMode.CONTAINS },
        name: { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }] },
        //'asset.name': { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }] },
        //date: { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.DATE_IS }] },
        //amount: { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.EQUALS }] },
        //status: { operator: FilterOperator.OR, constraints: [{ value: null, matchMode: FilterMatchMode.EQUALS }] },
        //activity: { value: [0, 100], matchMode: FilterMatchMode.BETWEEN },
        //verified: { value: null, matchMode: FilterMatchMode.EQUALS }
    };
}

function resetAllFilters() {
  Object.keys(filters.value).forEach(key => {
    filters.value[key].value = null;
  });
}

function formatCurrency(value) {
	
    //return value.toLocaleString('en-US', { style: 'currency', currency: 'USD' });
	return value;
}

function getCoin(coin_id) {
	const coin = this.coins.find(c => c.id === coin_id);
	return coin.code;
}

</script>

<template>
	<DataTable
		:value="assets"
		:paginator="true"
		:rows="10"
		dataKey="id"
		:rowHover="true"
		v-model:filters="filters"
		filterDisplay="menu"
		:loading="loading1"
		:filters="filters"
		:globalFilterFields="['name', 'country.name', 'representative.name', 'balance', 'status']"
		showGridlines
	>
		<template #header>
			<div class="flex justify-between">
				<Button type="button" icon="pi pi-filter-slash" label="Clear" outlined @click="resetAllFilters()" />
				<IconField>
					<InputIcon>
						<i class="pi pi-search" />
					</InputIcon>
					<InputText v-model="filters['global'].value" placeholder="Keyword Search" />
				</IconField>
			</div>
		</template>
		<template #empty> No assets found. </template>
		<template #loading> Loading assets data. Please wait. </template>
			
		<Column field="name" header="Name" style="min-width: 12rem">
			<template #body="{ data }">
				{{ data.name }}
			</template>
			<template #filter="{ filterModel }">
				<InputText v-model="filterModel.value" type="text" placeholder="Search by name" />
			</template>
		</Column>
		<Column header="Amount" filterField="amount" dataType="numeric" style="min-width: 10rem">
			<template #body="{ data }">
				{{ formatCurrency(data.amount) }}
			</template>
			<template #filter="{ filterModel }">
				<InputNumber v-model="filterModel.value" mode="currency" currency="USD" locale="en-US" />
			</template>
		</Column>
		<Column header="Coin" field="coin" :filterMenuStyle="{ width: '14rem' }" style="min-width: 12rem">
			<template #body="{ data }">
				<Tag :value="getCoin(data.coin_id)" :coin="data.coin_id" />
			</template>
			<template #filter="{ filterModel }">
				<Select v-model="filterModel.value" :options="statuses" placeholder="Select One" showClear>
					<template #option="slotProps">
						<Tag :value="slotProps.option" :severity="getCoin(slotProps.option)" />
					</template>
				</Select>
			</template>
		</Column>
		<Column field="description" header="Description" style="min-width: 12rem">
			<template #body="{ data }">
				{{ data.description }}
			</template>
			<template #filter="{ filterModel }">
				<InputText v-model="filterModel.value" type="text" placeholder="Search by description" />
			</template>
		</Column>
	</DataTable>
</template>