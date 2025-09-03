<script lang="ts">
	import award2gis from '$lib/images/Award2gis.png';
	import { AWARD_2GIS_LINK } from '../constants';
</script>

<a
	class="relative z-1 flex items-center gap-3 rounded-2xl bg-gradient-to-br from-yellow-700 to-yellow-500 py-2 pr-4 pl-4"
	target="_blank"
	href={AWARD_2GIS_LINK}
>
	<div class="absolute inset-0.5 -z-1 rounded-[0.875rem] bg-blue-900/80"></div>
	<img src={award2gis} alt="Award 2GIS" class="h-8 w-auto shrink-0" />
	<div class="flex flex-col">
		<p class="text-base/5 font-bold text-white">Премия 2GIS</p>
		<p class="text-xs/5 text-stone-300">Лучшая кофейня 2025</p>
	</div>
</a>
