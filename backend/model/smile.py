import opensmile

class Smile():
    def __init__(self):
        self.smile = opensmile.Smile(
                feature_set=opensmile.FeatureSet.eGeMAPSv02,
                feature_level=opensmile.FeatureLevel.LowLevelDescriptors,
                )
    
    def feature_extract(self, audio):
        features = self.smile.process_file(audio)

        return features
    


if __name__ == "__main__":

    smiley = Smile()

    print(smiley.feature_extract(r"testing\test.wav"))
        