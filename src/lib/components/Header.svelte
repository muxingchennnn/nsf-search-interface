<script>
	import SearchBar from './SearchBar.svelte';
	import { Info } from 'lucide-svelte';
	import { Modal, Listgroup, Avatar, ListgroupItem } from 'flowbite-svelte';

	let openModal = false;

	let contactList = [
		{
			img: { src: '/avatar/avatar-muxing.jpeg', alt: 'Muxing' },
			name: 'Muxing Chen',
			email: 'chen.muxin@northeastern.edu'
		},
		{
			img: { src: '/avatar/avatar-jethro.jpeg', alt: 'Jethro' },
			name: 'Jethro Lee',
			email: 'lee.jet@northeastern.edu'
		},
		{
			img: { src: '/avatar/avatar-shani.jpeg', alt: 'Shani' },
			name: 'Shani Spivak',
			email: 'spivak.s@northeastern.edu'
		},
		{
			img: { src: '/avatar/avatar-enrico.jpeg', alt: 'Enrico' },
			name: 'Enrico Bertini',
			email: 'e.bertini@northeastern.edu'
		}
	];
</script>

<header
	class="mx-[auto] my-0 flex h-[5rem] max-w-[1440px] items-center justify-between gap-16 bg-background px-[2rem]"
>
	<div class="flex w-full min-w-[600px] basis-[60%] items-center">
		<p class="whitespace-nowrap font-sans text-[1.2rem] font-[700]">NSF CISE AWARDS</p>
		<SearchBar class="ml-4" />
	</div>
	<button
		on:click={() => {
			openModal = !openModal;
		}}
	>
		<Info size={24} class="cursor-pointer opacity-50 hover:opacity-100" />
	</button>

	<Modal bind:open={openModal} placement="top-right" size="xs" autoclose outsideclose class="">
		<p class="text-base leading-relaxed text-foreground dark:text-gray-400">
			Welcome to the NSF CISE Awards Search Interface v1!
		</p>
		<p class="text-base leading-relaxed text-foreground dark:text-gray-400">
			We developed this interface to offer a streamlined and delightful search experience within the
			NSF CISE awards dataset. It is still in its early stages, and we plan to improve it over time.
		</p>
		<p class="text-base leading-relaxed text-foreground dark:text-gray-400">
			If you have any questions or suggestions, please feel free to contact us.
		</p>
		<Listgroup items={contactList} let:item class="mt-0 border-0 dark:!bg-transparent ">
			<div class="flex items-center space-x-4 rtl:space-x-reverse">
				<Avatar src={item.img.src} alt={item.img.alt} class="flex-shrink-0" />
				<div class="min-w-0 flex-1">
					<p class="truncate text-sm font-medium text-foreground dark:text-white">
						{item.name}
					</p>
					<p class="truncate text-sm text-gray-500 dark:text-gray-400">
						{item.email}
					</p>
				</div>
			</div>
		</Listgroup>
	</Modal>
</header>

<!-- <Separator class="sticky top-[5rem]" /> -->

<style>
	li {
		padding-left: 0px;
	}
</style>
