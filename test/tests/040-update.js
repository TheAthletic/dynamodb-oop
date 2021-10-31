
describe('update()', function () {

	it('.explain().update', function(done) {

		DynamoDB
			.explain()
			.table($tableName)
			.where('hash').eq('h')
			.where('range').eq('r')
			.update({
				string: 'newstring',
				boolean: false,
				increment: DynamoDB.add(9),
				decrement: DynamoDB.add(-2),
				null: null,
				ss: new Set(['a','b','c']),
				ns: new Set([1,2,3]),
				ssadd: DynamoDB.add( DynamoDB.SS(['d','e']) ),
				nsadd: DynamoDB.add( DynamoDB.NS([4,5]) ),
				ssdel: DynamoDB.add( DynamoDB.SS(['f','g']) ),
				nsdel: DynamoDB.add( DynamoDB.NS([6,7]) ),
			}, function(err, data) {
				assert.deepEqual(data,{
					"method":"updateItem",
					"payload":{
						"TableName":"test_hash_range",
						"Key":{"hash":{"S":"h"},
						"range":{"S":"r"}},
						"Expected":{"hash":{"Exists":true,"Value":{"S":"h"}},"range":{"Exists":true,"Value":{"S":"r"}}},
						"AttributeUpdates":{
							"string":{"Action":"PUT","Value":{"S":"newstring"}},
							"boolean":{"Action":"PUT","Value":{"BOOL":false}},
							"increment":{"Action":"ADD","Value":{"N":"9"}},
							"decrement":{"Action":"ADD","Value":{"N":"-2"}},
							"null":{"Action":"PUT","Value":{"NULL":true}},
							"ss":{"Action":"PUT","Value":{"SS":["a","b","c"]}},
							"ns":{"Action":"PUT","Value":{"NS":["1","2","3"]}},
							"ssadd":{"Action":"ADD","Value":{"SS":["d","e"]}},
							"nsadd":{"Action":"ADD","Value":{"NS":["4","5"]}},
							"ssdel":{"Action":"ADD","Value":{"SS":["f","g"]}},
							"nsdel":{"Action":"ADD","Value":{"NS":["6","7"]}}
						},
						"ReturnConsumedCapacity":"TOTAL"
					}
				})
				done()
			})

	})

	// dynalite: "ADD action is not supported for the type L", UpdateExpression
	it('.update( existing_item )', function(done) {
		// insert
		DynamoDB
			.table($tableName)
			.insert_or_replace({
				hash: 'test-update',
				range:1,
				old_number: 1,
				//old_array: [1,2,3],
				string: 'aaa',
				'ignore': 'me',
				'delete': 'me'
			}, function(err) {
				if (err)
					throw err

				DynamoDB
					.table($tableName)
					.where('hash').eq('test-update')
					.where('range').eq(1)
					.return(DynamoDB.ALL_NEW)
					.update({
						gsi_range: 'b',
						string: 'newstring',
						boolean: false,
						old_number: DynamoDB.add(9),
						null: null,
						//old_array: DynamoDB.add([ 1, 'a', null, { k1: 'v1', k2: 'v2', k3: 'v3' }, [] ]),
						object: { key1: 'value1', key2: 22 },
						delete: DynamoDB.del()
					}, function(err, data) {
						if (err)
							throw err

						assert.deepEqual(data, {
							hash: 'test-update',
							range: 1,
							old_number: 10,
							//old_array: [ 1,2,3, 1, 'a', null, { k3: 'v3', k1: 'v1', k2: 'v2' }, [] ],
							string: 'newstring',
							boolean: false,
							ignore: 'me',

							null: null,
							gsi_range: 'b',
							object: { key2: 22, key1: 'value1' },
						})
						done()
					})
			})
	})


	it('.return(DynamoDB.UPDATED_OLD).update( existing_item )', function(done) {

		DynamoDB
			.table($tableName)
			//.on('beforeRequest', function(op, payload) {
			//	console.log(op, JSON.stringify(payload,null,"\t"))
			//})
			.insert_or_replace({
				hash: 'test-updated-old',
				range: 1,

				number: 10,
				number2: 10.5,
				boolean: true,
			}, function(err) {
				if (err) throw err

				DynamoDB
					.table($tableName)
					.where('hash').eq('test-updated-old')
					.where('range').eq(1)
					.return(DynamoDB.UPDATED_OLD)
					//.on('beforeRequest', function(op, payload) {
					//	console.log(op, JSON.stringify(payload,null,"\t"))
					//})
					.update({
						number: DynamoDB.add(20),
						number2: 30,
						boolean: false,
					}, function(err, data ) {

						if (err) throw err
						assert.deepEqual(data, { number: 10, number2: 10.5, boolean: true })
						done()
					})
			})
	})


	it('.update() - test new Set( <ARRAY_OF_NUMBERS> )', function(done) {
		DynamoDB
			.table($tableName)
			.where('hash').eq('test-updated-old')
			.where('range').eq(1)
			.update({
				set: new Set([ 111, 222, 333 ]),
			}, function(err, data) {
				if (err)
					throw err

				DynamoDB
					.table($tableName)
					.where('hash').eq('test-updated-old')
					.where('range').eq(1)
					.get(function(err, item, raw ) {
						if (err)
							throw err

						assert.deepEqual(raw.Item.set.NS, [ 111, 222, 333 ], {strict: true })
						done()
					})
			})
	})

	it('.update() - test new Set( <ARRAY_OF_STRINGS> )', function(done) {
		DynamoDB
			.table($tableName)
			.where('hash').eq('test-updated-old')
			.where('range').eq(1)
			.update({
				set: new Set([ 'aaa', 'bbb', 'ccc' ]),
			}, function(err, data ) {
				if (err)
					throw err


				DynamoDB
					.table($tableName)
					.where('hash').eq('test-updated-old')
					.where('range').eq(1)
					.get(function(err, item, raw ) {
						if (err)
							throw err


						assert.deepEqual(raw.Item.set.SS, [ 'aaa', 'bbb', 'ccc'  ], {strict: true })
						done()
					})
			})
	})

	it('.update() - test new Set( <MIXED> )', function(done) {
		DynamoDB
			.table($tableName)
			.where('hash').eq('test-updated-old')
			.where('range').eq(1)
			.update({
				set1: new Set(),
				set2: new Set(['a', 1, {} ]),
			}, function(err, data ) {
				if (err)
					throw err


				DynamoDB
					.table($tableName)
					.where('hash').eq('test-updated-old')
					.where('range').eq(1)
					.get(function(err, item, raw ) {
						if (err)
							throw err

						//console.log(JSON.stringify(raw, null, "\t"))
						assert.deepEqual(raw.Item.set1.L, [], {strict: true })
						assert.deepEqual(raw.Item.set2.L, [ { "S": "a" }, { "N": "1" }, { "M": {} }  ], {strict: true })

						done()
					})
			})
	})




	it('update() test empty string', function(done) {
		var $obj = {
			empty_string: '',
		}
		DynamoDB
			.table($tableName)
			.where('hash').eq('test-updated-old')
			.where('range').eq(1)
			.update($obj, function(err, data) {
				if (err)
					throw err

				DynamoDB
					.table($tableName)
					.where('hash').eq('test-updated-old')
					.where('range').eq(1)
					.get(function(err, item) {
						if (err)
							throw err

						assert.deepEqual(item.empty_string, '', {strict: true } )
						done()
					})
			})
	})




	it('.update().then()', function(done) {
		DynamoDB
			.table($tableName)
			.return(DynamoDB.UPDATED_OLD)
			.where('hash').eq('test-updated-old')
			.where('range').eq(1)
			.update({
				number: 1,
			})
			.then(function(data) {
				done()
			})
	})

	// causes UnhandledPromiseRejectionWarning
	// it('.update() - unhandled', function(done) {
	// 	DynamoDB
	// 		.table($tableName)
	// 		.where('hash').eq(1)
	// 		.where('range_unexistent').eq(1)
	// 		.update({})
	// 	setTimeout(function() {
	// 		done()
	// 	},5000)
	// })

	it('.update().catch()', function(done) {
		DynamoDB
			.table($tableName)
			.where('hash').eq(1)
			.where('range_unexistent').eq(1)
			.update({})
			.catch(function(err) {
				done()
			})
	})




	it('.update() - add() to List, StringSet, NumberSet', function(done) {
		async.waterfall([

			function(cb) {
				DynamoDB
					.table($tableName)
					.insert_or_replace({
						hash: 'test-updated-ss-add',
						range: 1,
						arr: ['x','y'],
						//obj: {number: 1},
						ss: DynamoDB.SS( ['bbb','ccc'] ),
						ns: DynamoDB.NS( [ 33,22] ),
					}, function(err) {
						if (err) throw err
						cb()
					})
			},

			function(cb) {
				DynamoDB
					.table($tableName)
					.where('hash').eq('test-updated-ss-add')
					.where('range').eq(1)
					.update({
						arr: DynamoDB.add( ['x','y', false, null, {}] ),
						//obj: DynamoDB.add( { color: 'blue'} ),
						ss:  DynamoDB.add( DynamoDB.SS(['aaa','ddd']) ),
						ns:  DynamoDB.add( DynamoDB.NS([11,44]) ),

					}, function(err, data ) {
						if (err) throw err

						cb()
					})
			},

		],function(err) {
				DynamoDB
					.table($tableName)
					.where('hash').eq('test-updated-ss-add')
					.where('range').eq(1)
					//.return(DynamoDB.UPDATED_OLD)
					//.on('beforeRequest', function(op, payload) {
					//	console.log(op, JSON.stringify(payload,null,"\t"))
					//})
					.get( function(err, data ) {
						if (err) throw err

						assert.deepEqual(data.arr, [ 'x', 'y', 'x', 'y', false, null, {} ] )
						assert.deepEqual(data.ss.sort(function(a,b) { return a > b ? 1 : -1 }), [ 'aaa', 'bbb', 'ccc', 'ddd' ] )
						assert.deepEqual(data.ns.sort(function(a,b) { return a > b ? 1 : -1 }), [ 11, 22, 33, 44 ] )

						done()
					})
		})
	})


	it('.update() - del() from StringSet and NumberSet', function(done) {
		async.waterfall([

			function(cb) {
				DynamoDB
					.table($tableName)
					.insert_or_replace({
						hash: 'test-updated-ss-del',
						range: 1,
						//arr: ['x','y'],
						ss: DynamoDB.SS( ['bbb','ccc'] ),
						ns: DynamoDB.NS( [ 33,22] ),
					}, function(err) {
						if (err) throw err
						cb()
					})
			},

			function(cb) {
				DynamoDB
					.table($tableName)
					.where('hash').eq('test-updated-ss-del')
					.where('range').eq(1)
					.update({

						ss:  DynamoDB.del( DynamoDB.SS(['bbb']) ),
						ns:  DynamoDB.del( DynamoDB.NS([22]) ),

					}, function(err, data ) {
						if (err) throw err

						cb()
					})
			},

		],function(err) {
				DynamoDB
					.table($tableName)
					.where('hash').eq('test-updated-ss-del')
					.where('range').eq(1)
					//.return(DynamoDB.UPDATED_OLD)
					//.on('beforeRequest', function(op, payload) {
					//	console.log(op, JSON.stringify(payload,null,"\t"))
					//})
					.get( function(err, data ) {
						if (err) throw err

						assert.deepEqual(data.ss, [ 'ccc' ] )
						assert.deepEqual(data.ns, [ 33 ] )

						done()
					})
		})
	})


	it('cleanup...', function(done) {
		DynamoDB
			.table($tableName)
			.scan(function(err, data) {
				if (err)
					throw err

				async.each(data, function(item,cb) {
					DynamoDB.table($tableName).where('hash').eq(item.hash).where('range').eq(item.range).delete(function(err) { cb(err) })
				}, function(err) {
					if (err)
						throw err

					done()
				})
			})
	})
})
