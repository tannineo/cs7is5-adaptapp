from model.picture import Picture

def get_by_tag(search_string):
    pictures = Picture.objects(tags=search_string)
    return pictures

def upload(name, image, tags):
    picture = Picture()
    picture.name = name
    picture.image = image
    
    picture.tags = tags
    picture.save()
    print(picture.image)
    return picture