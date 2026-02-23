<script lang="ts">
	type Props = {
		value?: number;
		min?: number;
		max?: number;
		label?: string;
		size?: number;
		onchange?: (value: number) => void;
	};

	let { value = $bindable(50), min = 0, max = 100, label = '', size = 26, onchange }: Props = $props();

	let knobEl: HTMLDivElement | undefined = $state();
	let dragging = $state(false);
	let startY = 0;
	let startValue = value;

	function clamp(val: number): number {
		return Math.max(min, Math.min(max, val));
	}

	function startDrag(e: PointerEvent) {
		dragging = true;
		startY = e.clientY;
		startValue = value;
		(e.target as HTMLElement).setPointerCapture(e.pointerId);
	}

	function onDrag(e: PointerEvent) {
		if (!dragging) return;
		const diff = startY - e.clientY;
		const sensitivity = (max - min) / 150;
		const newValue = clamp(startValue + diff * sensitivity);
		if (newValue !== value) {
			value = newValue;
			onchange?.(value);
		}
	}

	function stopDrag(e: PointerEvent) {
		dragging = false;
		(e.target as HTMLElement).releasePointerCapture(e.pointerId);
	}

	function handleWheel(e: WheelEvent) {
		e.preventDefault();
		const step = (max - min) / 50;
		const direction = e.deltaY < 0 ? 1 : -1;
		const newValue = clamp(value + step * direction);
		if (newValue !== value) {
			value = newValue;
			onchange?.(value);
		}
	}

	function handleKeydown(e: KeyboardEvent) {
		const step = (max - min) / 20;
		if (e.key === 'ArrowUp' || e.key === 'ArrowRight') {
			e.preventDefault();
			value = clamp(value + step);
			onchange?.(value);
		} else if (e.key === 'ArrowDown' || e.key === 'ArrowLeft') {
			e.preventDefault();
			value = clamp(value - step);
			onchange?.(value);
		}
	}

	const rotation = $derived(-135 + ((value - min) / (max - min)) * 270);
	const tickCount = 11;
	const ticks = $derived(
		Array.from({ length: tickCount }, (_, i) => {
			const angle = -135 + (i / (tickCount - 1)) * 270;
			return angle;
		})
	);
</script>

<div class="knob-container" style="--knob-size: {size}px;">
	{#if label}
		<span class="knob-label">{label}</span>
	{/if}
	<div class="knob-wrapper">
		<!-- Tick marks -->
		<div class="tick-ring">
			{#each ticks as angle, i}
				<div 
					class="tick" 
					class:major={i === 0 || i === tickCount - 1 || i === Math.floor(tickCount / 2)}
					style="transform: rotate({angle}deg);"
				></div>
			{/each}
		</div>
		
		<!-- The knob itself -->
		<div
			bind:this={knobEl}
			class="rotary-knob"
			class:dragging
			tabindex="0"
			role="slider"
			aria-label={label || 'Rotary knob'}
			aria-valuemin={min}
			aria-valuemax={max}
			aria-valuenow={value}
			onpointerdown={startDrag}
			onpointermove={onDrag}
			onpointerup={stopDrag}
			onpointercancel={stopDrag}
			onwheel={handleWheel}
			onkeydown={handleKeydown}
		>
			<!-- Knob grip ridges -->
			<div class="knob-grip"></div>
			
			<!-- Indicator line -->
			<div class="knob-indicator" style="transform: rotate({rotation}deg);"></div>
		</div>
	</div>
</div>

<style>
	.knob-container {
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 2px;
	}

	.knob-label {
		font-family: var(--font-mono);
		font-size: 0.4rem;
		font-weight: 600;
		color: var(--color-brown);
		letter-spacing: 0.08em;
		text-transform: uppercase;
	}

	.knob-wrapper {
		position: relative;
		width: calc(var(--knob-size) + 10px);
		height: calc(var(--knob-size) + 10px);
		display: flex;
		align-items: center;
		justify-content: center;
	}

	.tick-ring {
		position: absolute;
		inset: 0;
	}

	.tick {
		position: absolute;
		left: 50%;
		top: 2px;
		width: 1px;
		height: 3px;
		background: var(--color-tan-dark);
		transform-origin: 50% calc(var(--knob-size) / 2 + 3px);
		margin-left: -0.5px;
	}

	.tick.major {
		width: 1.5px;
		height: 4px;
		background: var(--color-brown);
		margin-left: -0.75px;
	}

	.rotary-knob {
		width: var(--knob-size);
		height: var(--knob-size);
		border-radius: 50%;
		position: relative;
		cursor: grab;
		touch-action: none;
		
		/* Metallic knob appearance */
		background: 
			radial-gradient(ellipse 80% 50% at 50% 20%, rgba(255,255,255,0.4) 0%, transparent 50%),
			radial-gradient(ellipse 60% 30% at 50% 85%, rgba(0,0,0,0.15) 0%, transparent 50%),
			linear-gradient(160deg, var(--color-cream) 0%, var(--color-tan) 40%, var(--color-tan-dark) 100%);
		
		border: 2px solid var(--color-brown);
		box-shadow: 
			inset 0 2px 4px rgba(255,255,255,0.3),
			inset 0 -2px 4px rgba(0,0,0,0.15),
			0 2px 6px rgba(0,0,0,0.35),
			0 4px 8px rgba(0,0,0,0.15);
		
		transition: box-shadow 0.15s ease;
	}

	.rotary-knob:hover {
		box-shadow: 
			inset 0 2px 4px rgba(255,255,255,0.35),
			inset 0 -2px 4px rgba(0,0,0,0.15),
			0 2px 8px rgba(0,0,0,0.4),
			0 4px 10px rgba(0,0,0,0.2);
	}

	.rotary-knob.dragging {
		cursor: grabbing;
		box-shadow: 
			inset 0 2px 4px rgba(255,255,255,0.25),
			inset 0 -2px 4px rgba(0,0,0,0.2),
			0 1px 4px rgba(0,0,0,0.4),
			0 2px 6px rgba(0,0,0,0.2);
	}

	.rotary-knob:focus {
		outline: none;
		box-shadow: 
			inset 0 2px 4px rgba(255,255,255,0.3),
			inset 0 -2px 4px rgba(0,0,0,0.15),
			0 0 0 2px var(--color-amber),
			0 2px 6px rgba(0,0,0,0.35);
	}

	.knob-grip {
		position: absolute;
		inset: 3px;
		border-radius: 50%;
		background: repeating-conic-gradient(
			from 0deg,
			transparent 0deg 10deg,
			rgba(0,0,0,0.05) 10deg 20deg
		);
		pointer-events: none;
	}

	.knob-indicator {
		position: absolute;
		left: 50%;
		top: 3px;
		width: 2px;
		height: calc(var(--knob-size) / 2 - 5px);
		margin-left: -1px;
		transform-origin: 50% calc(var(--knob-size) / 2 - 3px);
		
		background: linear-gradient(180deg, var(--color-brown-dark) 0%, var(--color-brown) 100%);
		border-radius: 1px;
		box-shadow: 
			inset 0 0 1px rgba(0,0,0,0.3),
			0 1px 1px rgba(255,255,255,0.2);
	}
</style>
