<script lang="ts">
	import { message } from '$lib/scripts/utils';

	let form = {
		name: '',
		email: '',
		message: ''
	};

	async function sendForm() {
		const req = await fetch('/form', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(form)
		});

		const res = await req.json();
		console.log('client', res);
	}
</script>

<svelte:head>
	<title>{message}</title>
</svelte:head>

<div class="wrapper col acenter xfill">
	<h1>Send a form</h1>

	<form class="col acenter xfill" on:submit|preventDefault={sendForm}>
		<div class="input-wrapper col xfill">
			<label for="name">Name</label>
			<input
				class="xfill"
				id="name"
				type="text"
				bind:value={form.name}
				placeholder="Ex. John Doe"
				required
			/>
		</div>

		<div class="input-wrapper col xfill">
			<label for="email">Email</label>
			<input
				class="xfill"
				id="email"
				type="email"
				bind:value={form.email}
				placeholder="Ex. this@email.com"
				required
			/>
		</div>

		<div class="input-wrapper col xfill">
			<label for="message">Message</label>
			<textarea
				class="xfill"
				id="message"
				bind:value={form.message}
				placeholder="Here your message"
				required
			/>
		</div>

		<button class="sec semi">SEND</button>
	</form>
</div>

<style lang="scss">
	.wrapper {
		background: $white;
		color: $pri;
		padding: 60px;

		@media (prefers-color-scheme: dark) {
			background: $black;
			color: $sec;
		}
	}

	form {
		max-width: 600px;
	}

	.input-wrapper {
		margin-bottom: 20px;
	}

	label {
		padding: 5px 15px;
	}

	input,
	textarea {
		background: $sec;
		border-radius: 3px;
		color: $pri;

		&:focus {
			outline: $link;
		}
	}

	textarea {
		height: 200px;
		resize: none;
	}

	button {
		width: 200px;
	}
</style>
