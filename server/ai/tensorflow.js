const tf= require('@tensorflow/tfjs');

const model = await tf.loadLayersModel('https://foo.bar/tfjs_artifacts/model.json');
