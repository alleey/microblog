package org.zabardast.resources.dto.converters;

import org.modelmapper.Converter;
import org.modelmapper.spi.MappingContext;
import org.zabardast.resources.dto.ResourceResponseRepresentation;
import org.zabardast.resources.model.Resource;

public class ResourceToResourceResponseRepresentationConverter implements Converter<Resource, ResourceResponseRepresentation> {

    @Override
    public ResourceResponseRepresentation convert(MappingContext<Resource, ResourceResponseRepresentation> context)
    {
        Resource s = context.getSource();
        ResourceResponseRepresentation d = context.getDestination();

        if(d == null)
            d = new ResourceResponseRepresentation();

        d.setKey(s.getKey());
        d.setResource(s.getResource());
        d.setOwner(s.getOwner());
        d.setContentType(s.getContentType());
        d.setContentLocation(s.getContentLocation());
        d.setCreatedOn(s.getCreatedOn());
        d.setUpdatedOn(s.getUpdatedOn());

//                ResourceKey key = new ResourceKey(s.getResource(), s.getFolder(), s.getOwner());
//                d.setContents(storageService.load(key));
        return d;
    }
}
