hoverBomb.js
============

### Explode text on hover

#### Usage

Import jQuery and hoverBomb plugin
```js
<script src="js/jquery-1.8.2.min.js"></script>
<script src="js/jquery.hoverBomb.min.js"></script>
```

Then
```js
$('.bomb').hoverBomb();
```

#### Option
<table>
	<thead>
		<tr>
			<th>Option</th>
			<th>Default</th>
			<th>Description</th>
		</tr>
	</thead>
	<tbody>
		<tr>
			<td><strong>direction</strong></td>
			<td><em>'all'</em></td>
			<td>direction to explode @param 'all' || 'north' || 'south' || 'west' || 'east'</td>
		</tr>
		<tr>
			<td><strong>diameter</strong></td>
			<td><em>100</em></td>
			<td>diameter of explosion</td>
		</tr>
		<tr>
			<td><strong>shakeStep</strong></td>
			<td><em>1</em></td>
			<td>pre-explosive movement of radius increment value</td>
		</tr>
		<tr>
			<td><strong>shakeRotate</strong></td>
			<td><em>45</em></td>
			<td>pre-explosive movement of degree</td>
		</tr>
		<tr>
			<td><strong>shakeLimit</strong></td>
			<td><em>10</em></td>
			<td>pre-explosive movement of radius value value</td>
		</tr>			
		<tr>
			<td><strong>growSpeed</strong></td>
			<td><em>1</em></td>
			<td>pre-explosive movement of growing speed</td>
		</tr>
		<tr>
			<td><strong>explosionMomentum</strong></td>
			<td><em>50</em></td>
			<td>momentum of explosion</td>
		</tr>
		<tr>
			<td><strong>afterEffect</strong></td>
			<td><em>'fade'</em></td>
			<td>after effect of explosion @param 'fade' || 'animate'</td>
		</tr>
		<tr>
			<td><strong>afterAnimationTime</strong></td>
			<td><em>500</em></td>
			<td>if afterEffect was 'animate' this determines animation time</td>
		</tr>
	</tbody>
</table>

#### Inspiration

[jRumble.js](http://jackrugile.com/jrumble/)  
[fontBomb](http://fontbomb.ilex.ca/)

#### Demo

[DEMO](http://ishibashijun.github.io/programming/2015/02/26/hoverBomb)

#### LICENSE

[MIT](http://www.opensource.org/licenses/mit-license.php)