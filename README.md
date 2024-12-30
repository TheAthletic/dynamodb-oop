## @theathletic/dynamodb

This is a NodeJS library to access Amazon DynamoDB databases, forked from @awspilot/dynamodb.
[Documentation and Examples](https://awspilot.dev/)

```bash
	npm install @theathletic/dynamodb
```

### Q: How to publish a new version?

TL;DR create a new release to kick off the `npm publish` Github action

<table>
	<tr>
		<td>1</td>
		<td>Go <a href="https://github.com/TheAthletic/dynamodb-oop/releases/new">draft a new release</a></td>
		<td></td>
	</tr>
	<tr>
		<td>2</td>
		<td>Pick the tag:
			<ul>
				<li>The version tag can be created manually (see <code>npm version</code>) and will be selectable</li>
				<li>Alternatively, the tag can be created on the fly without leaving the release page 👉</li>
            </ul>
            Please note:
            <ul>
				<li>Use the classic <code>v[major].[minor].[patch]</code> versioning please</li>
                <li>Make sure the version in <code>package.json</code> is updated too</li>
				<li>Always release code that are already in <code>master</code> please (i.e. no unmerged branch release)</li>
			</ul>
		</td>
		<td><image src="https://github.com/user-attachments/assets/b0b36776-529f-491b-95d4-c67e314b63ca"/></td>
	</tr>
	<tr>
		<td>3</td>
		<td>Fill release form:
			<ul>
				<li>Release title = version</li>
				<li>Fill in the list of changes included in the release. ASCII art is a must.</li>
				<li>Alternatively, just generate it 👉</li>
			</ul>
		</td>
		<td><image src="https://github.com/user-attachments/assets/4083cece-d996-45fd-b7b7-d03c94412294"/></td>
	</tr>
	<tr>
		<td>4</td>
		<td>Publish:
			<ul>
				<li>Close your eyes</li>
				<li>Take a deep breath</li>
				<li>Click <code>Publish release</code></li>
				<li>🍾</li>
			</ul>
		</td>
		<td><image src="https://github.com/user-attachments/assets/2b184ad8-6d2f-49b0-a79c-6a3225b41e62"/></td>
	</tr>	
	<tr>
		<td>5</td>
		<td>Check <a href="https://github.com/TheAthletic/dynamodb-oop/actions/workflows/npm-publish-github-packages.yml">Node.js package action</a>
			<ul>
				<li>The new package should be published within less than a minute, if things go right<sup>[0]</sup></li>
			</ul>
		</td>
		<td></td>
	</tr>
</table>

<sup>[0]</sup> If things don't go right:
- then have fun looking at the log and figure out what went wrong, may the luck be with you
- my 2¢: unless the package has already been published (which is less likely if the action fails), it should be safe to delete the release and try creating the same release again after updating any code as necessary
