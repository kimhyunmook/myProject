import tensorflow as tf
import os

os.environ["TF_CPP_MIN_LOG_LEVEL"] = "2"

hello = tf.constant("hello, TensolFlow!")

node1 = tf.constant(3.0, tf.float32)
node2 = tf.constant(4.0, tf.float32)


@tf.function
def forward():
    return node1 + node2

out_a = forward()
print(out_a)