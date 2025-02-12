import axios from 'axios'
import { Knex } from 'knex'

import {API_KEY, API_URL} from './config/config.main'

interface Warehouse {
	boxDeliveryAndStorageExpr: string
	boxDeliveryBase: string
	boxDeliveryLiter: string
	boxStorageBase: string
	boxStorageLiter: string
	warehouseName: string
}

interface TariffData {
	dtNextBox: string
	dtTillMax: string
	warehouseList: Warehouse[]
}

interface ApiResponse {
	response: {
		data: TariffData
	}
}

interface Tariff {
	warehouse_name: string
	date: string
	box_delivery_and_storage_expr: string
	box_delivery_base: string
	box_delivery_liter: string
	box_storage_base: string
	box_storage_liter: string
	dt_next_box: string
	dt_till_max: string
}

export async function fetchAndStoreTariffs(knex: Knex): Promise<void> {
	const today = new Date().toISOString().split('T')[0] 

	try {
		const response = await axios.get<ApiResponse>(API_URL, {
			params: { date: today },
			headers: {
				Authorization: `Bearer ${API_KEY}`,
			},
		})

		const { dtNextBox, dtTillMax, warehouseList } = response.data.response.data

		for (const warehouse of warehouseList) {
			const tariffData: Tariff = {
				warehouse_name: warehouse.warehouseName,
				date: today,
				box_delivery_and_storage_expr: warehouse.boxDeliveryAndStorageExpr,
				box_delivery_base: warehouse.boxDeliveryBase,
				box_delivery_liter: warehouse.boxDeliveryLiter,
				box_storage_base: warehouse.boxStorageBase,
				box_storage_liter: warehouse.boxStorageLiter,
				dt_next_box: dtNextBox,
				dt_till_max: dtTillMax,
			}
			await upsertTariff(knex, tariffData)
		}
	} catch (error) {
		console.error('Error fetching tariffs:', error)
	}
}

async function upsertTariff(knex: Knex, data: any) {
  const {
    warehouse_name,
    date,
    box_delivery_and_storage_expr,
    box_delivery_base,
    box_delivery_liter,
    box_storage_base,
    box_storage_liter,
    dt_next_box,
    dt_till_max,
  } = data;

  const convertToFloat = (value: string): number => {
    return parseFloat(value.replace(',', '.'));
  };

  const boxDeliveryBase = convertToFloat(box_delivery_base);
  const boxStorageBase = convertToFloat(box_storage_base);
  const boxDeliveryLiter = convertToFloat(box_delivery_liter);
  const boxStorageLiter = convertToFloat(box_storage_liter);

  const parseDate = (dateString: string): string | null => {
    const parsedDate = new Date(dateString);
    return parsedDate.toString() !== 'Invalid Date' ? parsedDate.toISOString() : null;
  };

  const validDtNextBox = parseDate(dt_next_box);
  const validDtTillMax = parseDate(dt_till_max);

  try {
    await knex('warehouse_tariffs')
      .insert({
        warehouse_name,
        date,
        box_delivery_and_storage_expr,
        box_delivery_base: boxDeliveryBase,
        box_delivery_liter: boxDeliveryLiter,
        box_storage_base: boxStorageBase,
        box_storage_liter: boxStorageLiter,
        dt_next_box: validDtNextBox,
        dt_till_max: validDtTillMax,
      })
      .onConflict(['warehouse_name', 'date'])
      .merge();
  } catch (error) {
    console.error('Error upserting tariff:', error);
  }
}
